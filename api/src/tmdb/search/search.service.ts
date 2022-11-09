import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { resourceLimits } from 'worker_threads';
import { Search } from './type';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  async search(searchQuery: string): Promise<Search> {
    const { data } = await this.httpService.axiosRef.get<Search>(
      'https://api.themoviedb.org/3/search/multi',
      {
        params: {
          ...this.httpService.axiosRef.defaults.params,
          page: 1,
          query: searchQuery,
        },
      },
    );

    data.results = data.results.filter(
      (result) => result.media_type !== 'person',
    );

    return data;
  }
}
