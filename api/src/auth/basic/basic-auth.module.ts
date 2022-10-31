import { Module } from '@nestjs/common';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from '../token/token.module';
import { BasicAuthService } from './basic-auth.service';

@Module({
  providers: [BasicAuthService],
  exports: [BasicAuthService],
  imports: [UserModule, RefreshTokenModule, TokenModule],
})
export class BasicAuthModule {}
