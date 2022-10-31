import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TmdbTokenModule } from './tmdb/tmdb-token/tmdb-token.module';
import { TmdbAuthModule } from './tmdb/tmdb-auth.module';
import { BasicAuthModule } from './basic/basic-auth.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [TmdbTokenModule, TmdbAuthModule, BasicAuthModule, GoogleAuthModule],
})
export class AuthModule {}
