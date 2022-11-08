import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import { verify } from 'jsonwebtoken';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { TokenService } from '../token/token.service';
import { RefreshToken } from '@prisma/client';

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
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    const newUser = await this.userService.createUser({
      email,
      password: hashedPassword,
    });
    return this.tokenService.newRefreshAndAccessToken(newUser);
  }

  async verifyToken(token: string, refreshToken: string) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      if (typeof decoded === 'string') {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
      return {
        accessToken: token,
        refreshToken: refreshToken,
        expiresIn: 3600,
      };
    } catch (error) {
      const { accessToken } = await this.refresh(refreshToken);
      return { accessToken, refreshToken: refreshToken, expiresIn: 3600 };
    }
  }

  async refresh(refreshStr: string) {
    const refreshToken = await this.tokenService.retriveRefreshToken(
      refreshStr,
    );
    if (!refreshToken) {
      throw new HttpException('Invalid refresh Token', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.userService.user({ id: refreshToken.userId });
    if (!user) {
      throw new HttpException('No user found with', HttpStatus.NOT_FOUND);
    }
    const accessToken = await this.tokenService.createAccessToken(user);
    return { accessToken };
  }

  async logout(refreshStr: string) {
    const refreshToken = await this.tokenService.retriveRefreshToken(
      refreshStr,
    );
    if (!refreshToken) {
      throw new HttpException(
        'User already logged out',
        HttpStatus.UNAUTHORIZED,
      );
    }
    this.refreshTokenService.deleteRefreshToken({ id: refreshToken.id });
    throw new HttpException('User logged out', HttpStatus.OK);
  }
}
