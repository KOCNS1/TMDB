import { Injectable } from '@nestjs/common';
import { Prisma, TmdbToken } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TmdbTokenService {
  constructor(private prisma: PrismaService) {}

  async createTmdbToken(
    data: Prisma.TmdbTokenUncheckedCreateInput,
  ): Promise<TmdbToken> {
    return this.prisma.tmdbToken.create({
      data,
    });
  }

  async deleteTmdbToken(where: Prisma.TmdbTokenWhereUniqueInput) {
    return this.prisma.tmdbToken.delete({
      where,
    });
  }

  async getTmdbToken(where: Prisma.TmdbTokenWhereUniqueInput) {
    return this.prisma.tmdbToken.findUnique({
      where,
    });
  }
}
