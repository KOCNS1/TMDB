import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RequestToken } from './type/requestToken';
import { AccessToken } from './type/accessToken';
import { TmdbTokenService } from 'src/auth/tmdb/tmdb-token/tmdb-token.service';

@Injectable()
export class TmdbAuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly tmdbTokenService: TmdbTokenService,
  ) {}

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
      throw new HttpException("Can't get access token from TMBD", 500);
    }
  }

  async connectTmdb(redirectUrl?: string) {
    return await this.createAuthUrl(redirectUrl);
  }

  async linkTmdb(userId: string, requestToken: string) {
    try {
      const hasToken = await this.tmdbTokenService.getTmdbToken({
        userId: +userId,
      });
      if (hasToken) return hasToken;
      else {
        const tmdbToken = await this.getAccessToken(requestToken);
        return await this.tmdbTokenService.createTmdbToken({
          userId: +userId,
          token: tmdbToken.access_token,
          tmdbId: tmdbToken.account_id,
        });
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async userHasTmdbToken(userId: string): Promise<boolean> {
    const tmdbToken = await this.tmdbTokenService.getTmdbToken({
      userId: +userId,
    });
    return !!tmdbToken;
  }

  async unlinkTmdb(userId: string) {
    const tmdbToken = await this.tmdbTokenService.getTmdbToken({
      userId: +userId,
    });
    if (!tmdbToken) {
      throw new HttpException(
        'No tmdb token found for this user',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.tmdbTokenService.deleteTmdbToken({ id: tmdbToken.id });
  }
}
