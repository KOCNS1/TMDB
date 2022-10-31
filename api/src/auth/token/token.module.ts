import { Module } from '@nestjs/common';
import { RefreshTokenModule } from 'src/refresh-token/refresh-token.module';
import { TokenService } from './token.service';

@Module({
  imports: [RefreshTokenModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
