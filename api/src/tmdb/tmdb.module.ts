import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TmdbService } from './tmdb.service';
import { MovieService } from './movie/movie.service';
import { HttpModule } from '@nestjs/axios';
import { MovieModule } from './movie/movie.module';
import { TvModule } from './tv/tv.module';

@Module({
  providers: [TmdbService, MovieService],
  exports: [TmdbService],
  imports: [PrismaModule, HttpModule, MovieModule, TvModule],
})
export class TmdbModule {}
