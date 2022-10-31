import { Injectable } from '@nestjs/common';
import { Prisma, RefreshToken } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RefreshTokenService {
  constructor(private prisma: PrismaService) {}

  async createRefreshToken(
    data: Prisma.UserUncheckedCreateInput,
  ): Promise<RefreshToken> {
    const token = sign(data, process.env.JWT_REFRESH_SECRET);
    return this.prisma.refreshToken.create({
      data: {
        token,
        userId: data.id,
      },
    });
  }

  async deleteRefreshToken(where: Prisma.RefreshTokenWhereUniqueInput) {
    return this.prisma.refreshToken.delete({
      where,
    });
  }

  async getRefreshToken(where: Prisma.RefreshTokenWhereUniqueInput) {
    return this.prisma.refreshToken.findUnique({
      where,
    });
  }
}
