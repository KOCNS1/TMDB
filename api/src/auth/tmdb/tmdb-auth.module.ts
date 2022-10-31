import { Module } from '@nestjs/common';
import { TmdbAuthService } from './tmdb-auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [TmdbAuthService],
  exports: [TmdbAuthService],
  imports: [
    HttpModule.register({
      baseURL: 'https://api.themoviedb.org/4',
      params: { api_key: process.env.TMDB_API_KEY },
    }),
  ],
})
export class TmdbAuthModule {}
