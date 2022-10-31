import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context, status) {
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Invalid token');
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
