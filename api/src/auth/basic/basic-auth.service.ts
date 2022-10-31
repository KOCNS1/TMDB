import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import { verify } from 'jsonwebtoken';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class BasicAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly tokenService: TokenService,
  ) {}
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

    return this.tokenService.newRefreshAndAccessToken(user);
  }

  async register(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const user = await this.userService.user({ email });
    if (user) {
      throw new HttpException(
        'Warning: User already exists.',
        HttpStatus.CONFLICT,
      );
    }
    const newUser = await this.userService.createUser({
      email,
      password,
    });
    return this.tokenService.newRefreshAndAccessToken(newUser);
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
    const refreshToken = await this.tokenService.retriveRefreshToken(
      refreshStr,
      this.refreshTokenService,
    );
    if (!refreshToken) {
      return undefined;
    }
    const user = await this.userService.user({ id: refreshToken.userId });
    if (!user) {
      return undefined;
    }
    const accessToken = await this.tokenService.createAccessToken(user);
    return { accessToken };
  }

  async logout(refreshStr: string): Promise<void> {
    const refreshToken = await this.tokenService.retriveRefreshToken(
      refreshStr,
      this.refreshTokenService,
    );
    if (!refreshToken) {
      return;
    }
    await this.refreshTokenService.deleteRefreshToken({ id: refreshToken.id });
  }
}
