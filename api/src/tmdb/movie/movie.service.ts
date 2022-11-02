import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  AppendToResponseTv,
  GenericListResult,
  Movie,
  PopularInput,
} from 'src/types/api-interfaces';

@Injectable()
export class MovieService {
  constructor(private readonly httpService: HttpService) {}

  async getPopular(
    popularData?: PopularInput,
  ): Promise<GenericListResult<Movie>> {
    const { data } = await this.httpService.axiosRef.get<
      GenericListResult<Movie>
    >('https://api.themoviedb.org/3/movie/popular', {
      params: {
        ...this.httpService.axiosRef.defaults.params,
        region: popularData?.region,
        page: popularData?.page,
      },
    });

    return {
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
      results: data.results,
    };
  }

  async getDetails(
    id: number,
    appendToResponse?: AppendToResponseTv[],
  ): Promise<Movie> {
    console.log(appendToResponse);
    const { data } = await this.httpService.axiosRef.get<Movie>(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        params: {
          ...this.httpService.axiosRef.defaults.params,
          append_to_response: appendToResponse?.join(','),
        },
      },
    );

    return data;
  }
}
