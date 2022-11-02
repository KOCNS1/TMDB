import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class UserOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    return user.userId === +params.id;
  }
}
