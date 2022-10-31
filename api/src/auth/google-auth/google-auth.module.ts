import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from '../token/token.module';
import { GoogleAuthService } from './google-auth.service';

@Module({
  providers: [GoogleAuthService],
  exports: [GoogleAuthService],
  imports: [UserModule, TokenModule],
})
export class GoogleAuthModule {}
