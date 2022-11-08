import { Injectable } from '@nestjs/common';
import { RefreshToken, User } from '@prisma/client';
import { sign, verify } from 'jsonwebtoken';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';

@Injectable()
export class TokenService {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

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

  async retriveRefreshToken(token: string): Promise<RefreshToken> {
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
}
