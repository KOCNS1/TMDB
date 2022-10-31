import { Module } from '@nestjs/common';
import { TmdbAuthService } from './tmdb-auth.service';
import { HttpModule } from '@nestjs/axios';
import { TmdbTokenModule } from 'src/auth/tmdb/tmdb-token/tmdb-token.module';

@Module({
  providers: [TmdbAuthService],
  exports: [TmdbAuthService],
  imports: [
    HttpModule.register({
      baseURL: 'https://api.themoviedb.org/4',
      params: { api_key: process.env.TMDB_API_KEY },
    }),
    TmdbTokenModule,
  ],
})
export class TmdbAuthModule {}
