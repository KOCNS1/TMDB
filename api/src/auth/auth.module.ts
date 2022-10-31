import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TmdbTokenModule } from '../tmdb-token/tmdb-token.module';
import { TmdbAuthModule } from './tmdb/tmdb-auth.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [UserModule, RefreshTokenModule, TmdbTokenModule, TmdbAuthModule],
})
export class AuthModule {}
