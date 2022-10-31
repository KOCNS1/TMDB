import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { RequestToken } from './type/requestToken';
import { AccessToken } from './type/accessToken';

@Injectable()
export class TmdbAuthService {
  constructor(private readonly httpService: HttpService) {}

  async createRequestToken(redirectUrl?: string) {
    try {
      const {
        data: { request_token },
      } = await this.httpService.axiosRef.post<RequestToken>(
        'https://api.themoviedb.org/4/auth/request_token',
        { redirect_to: redirectUrl },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          },
        },
      );
      return request_token;
    } catch (error) {
      console.log(error.message);
      throw new HttpException("Can't create request token from TMBD", 500);
    }
  }

  async createAuthUrl(redirectUrl?: string) {
    const request_token = await this.createRequestToken(redirectUrl);
    return {
      url: `https://www.themoviedb.org/auth/access?request_token=${request_token}`,
      request_token,
    };
  }

  async getAccessToken(requestToken: string) {
    try {
      const {
        data: { access_token, account_id },
      } = await this.httpService.axiosRef.post<AccessToken>(
        'https://api.themoviedb.org/4/auth/access_token',
        {
          request_token: requestToken,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          },
        },
      );
      return { access_token, account_id };
    } catch (error) {
      console.log(error.message);
    }
  }
}
