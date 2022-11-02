import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TmdbModule } from 'src/tmdb/tmdb.module';

@Module({
  imports: [AuthModule, UserModule, TmdbModule, ConfigModule.forRoot()],
})
export class AppModule {}
