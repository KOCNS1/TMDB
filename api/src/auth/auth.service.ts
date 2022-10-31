import { Injectable } from '@nestjs/common';
import { TmdbAuthService } from './tmdb/tmdb-auth.service';
import { BasicAuthService } from './basic/basic-auth.service';
import { GoogleAuthService } from './google-auth/google-auth.service';

@Injectable()
export class AuthService {
  constructor(
    public googleAuthService: GoogleAuthService,
    public tmdbAuthService: TmdbAuthService,
    public basicAuthService: BasicAuthService,
  ) {}
}
