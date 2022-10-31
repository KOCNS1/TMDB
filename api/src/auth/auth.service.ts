import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, RefreshToken } from '@prisma/client';
import { sign, verify } from 'jsonwebtoken';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { UserService } from '../user/user.service';
import { Auth, google } from 'googleapis';
import { TmdbTokenService } from '../tmdb-token/tmdb-token.service';
import { TmdbAuthService } from './tmdb/tmdb-auth.service';

@Injectable()
export class AuthService {
  oauth2Client: Auth.OAuth2Client;

  constructor(
    private readonly userService: UserService,
    private readonly refreshTokenService: RefreshTokenService,
    private tmdbTokenService: TmdbTokenService,
    private tmdbAuthService: TmdbAuthService,
  ) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    this.oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  }

  /**
   * Google OAuth2
   */
  async loginGoogleUser(token: string) {
    const ticket = await this.oauth2Client
      .verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.NOT_ACCEPTABLE);
      });
    const payload = ticket.getPayload();
    const email = payload.email;
    const user = await this.userService.user({ email });
    if (!user) {
      throw new HttpException(
        'Warning: No user found, please register first',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.newRefreshAndAccessToken(user);
  }

  async registerGoogleUser(token: string) {
    const ticket = await this.oauth2Client
      .verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.NOT_ACCEPTABLE);
      });
    const payload = ticket.getPayload();
    const email = payload.email;
    const user = await this.userService.user({ email });
    if (user) {
      throw new HttpException(
        'User already exists, login instead',
        HttpStatus.CONFLICT,
      );
    }
    const newUser = await this.userService.createUser({
      email,
      name: payload.name,
    });
    return this.newRefreshAndAccessToken(newUser);
  }

  /**
   * Basic Auth
   */

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const user = await this.userService.user({ email });
    if (!user) {
      throw new HttpException(
        'Warning: Invalid credentials, try again.',
        HttpStatus.NOT_FOUND,
      );
    }
    const valid = await this.userService.validatePassword(user, password);
    if (!valid) {
      throw new HttpException(
        'Warning: Invalid credentials, try again.',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return this.newRefreshAndAccessToken(user);
  }

  async verifyToken(token: string, refreshToken: string) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      if (typeof decoded === 'string') {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      const { accessToken } = await this.refresh(refreshToken);
      return { accessToken, refreshToken: refreshToken, expiresIn: 3600 };
    }
  }

  async refresh(refreshStr: string) {
    const refreshToken = await this.retriveRefreshToken(refreshStr);
    if (!refreshToken) {
      return undefined;
    }
    const user = await this.userService.user({ id: refreshToken.userId });
    if (!user) {
      return undefined;
    }
    const accessToken = await this.createAccessToken(user);
    return { accessToken };
  }

  async logout(refreshStr: string): Promise<void> {
    const refreshToken = await this.retriveRefreshToken(refreshStr);
    if (!refreshToken) {
      return;
    }
    await this.refreshTokenService.deleteRefreshToken({ id: refreshToken.id });
  }

  /**
   * TMDB
   */
  async connectTmdb(redirectUrl?: string) {
    return await this.tmdbAuthService.createAuthUrl(redirectUrl);
  }

  async linkTmdb(userId: string, requestToken: string) {
    try {
      const tmdbToken = await this.tmdbAuthService.getAccessToken(requestToken);
      return await this.tmdbTokenService.createTmdbToken({
        userId: +userId,
        token: tmdbToken.access_token,
        tmdbId: tmdbToken.account_id,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async userHasTmdbToken(userId: string): Promise<boolean> {
    const tmdbToken = await this.tmdbTokenService.getTmdbToken({
      userId: +userId,
    });
    return !!tmdbToken;
  }

  async unlinkTmdb(userId: string) {
    const tmdbToken = await this.tmdbTokenService.getTmdbToken({
      userId: +userId,
    });
    if (!tmdbToken) {
      throw new HttpException(
        'No tmdb token found for this user',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.tmdbTokenService.deleteTmdbToken({ id: tmdbToken.id });
  }

  /**
   * Tokens logic
   */

  private async retriveRefreshToken(token: string): Promise<RefreshToken> {
    try {
      const decoded = verify(token, process.env.JWT_REFRESH_SECRET);
      if (typeof decoded === 'string') {
        return undefined;
      }
      const newRToken = await this.refreshTokenService.getRefreshToken({
        userId: decoded.id,
      });
      return newRToken;
    } catch (error) {
      return undefined;
    }
  }

  async createAccessToken(user) {
    return sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
  }

  async newRefreshAndAccessToken(user: User) {
    const hasToken = await this.refreshTokenService.getRefreshToken({
      userId: user.id,
    });
    const { token } = hasToken
      ? hasToken
      : await this.refreshTokenService.createRefreshToken(user);
    const accessToken = await this.createAccessToken(user);
    return { accessToken, refreshToken: token, expiresIn: 3600 };
  }
}
