import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { TmdbTokenService } from './tmdb-token.service';

@Module({
  providers: [TmdbTokenService],
  exports: [TmdbTokenService],
  imports: [PrismaModule],
})
export class TmdbTokenModule {}
