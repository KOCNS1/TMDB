import { Module } from '@nestjs/common';
import { TvService } from './tv.service';
import { TvController } from './tv.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [TvController],
  providers: [TvService],
  imports: [
    HttpModule.register({
      baseURL: 'https://api.themoviedb.org/4',
      params: { api_key: process.env.TMDB_API_KEY, language: 'en' },
    }),
  ],
})
export class TvModule {}
