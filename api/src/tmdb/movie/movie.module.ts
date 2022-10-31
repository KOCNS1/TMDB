import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

@Module({
  providers: [MovieService],
  imports: [
    HttpModule.register({
      baseURL: 'https://api.themoviedb.org/4',
      params: { api_key: process.env.TMDB_API_KEY },
    }),
  ],
  controllers: [MovieController],
})
export class MovieModule {}
