import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  AppendToResponseTv,
  GenericListResult,
  PopularInput,
  SimilarMovies,
  Tv,
  TVDetails,
} from 'src/types/api-interfaces';

@Injectable()
export class TvService {
  constructor(private readonly httpService: HttpService) {}

  async getPopular(popularData?: PopularInput): Promise<GenericListResult<Tv>> {
    const { data } = await this.httpService.axiosRef.get<GenericListResult<Tv>>(
      'https://api.themoviedb.org/3/tv/popular',
      {
        params: {
          ...this.httpService.axiosRef.defaults.params,
          region: popularData?.region,
          page: popularData?.page,
        },
      },
    );

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
  ): Promise<TVDetails> {
    const { data } = await this.httpService.axiosRef.get<TVDetails>(
      `https://api.themoviedb.org/3/tv/${id}`,
      {
        params: {
          ...this.httpService.axiosRef.defaults.params,
          append_to_response: appendToResponse?.join(','),
        },
      },
    );

    return data;
  }

  async getSimilar(id: number): Promise<GenericListResult<SimilarMovies>> {
    const { data } = await this.httpService.axiosRef.get<
      GenericListResult<SimilarMovies>
    >(`https://api.themoviedb.org/3/tv/${id}/similar`, {
      params: {
        ...this.httpService.axiosRef.defaults.params,
      },
    });

    return {
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
      results: data.results,
    };
  }
}
