import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [SearchService],
  imports: [
    HttpModule.register({
      baseURL: 'https://api.themoviedb.org/4',
      params: { api_key: process.env.TMDB_API_KEY },
    }),
  ],
  controllers: [SearchController],
})
export class SearchModule {}
