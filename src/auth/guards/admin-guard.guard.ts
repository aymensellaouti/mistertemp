import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User, UserRoleEnum } from '../../user/entities/user.entity';

@Injectable()
export class AdminGuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    return !!user && user.role === UserRoleEnum.admin;
  }
}
