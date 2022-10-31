import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  providers: [RefreshTokenService],
  exports: [RefreshTokenService],
  imports: [PrismaModule],
})
export class RefreshTokenModule {}
