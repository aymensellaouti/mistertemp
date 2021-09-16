import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contexts = [context.getClass(), context.getHandler()];
    const requiredRoles = this.reflector.getAllAndMerge('roles', contexts);
    const user = context.switchToHttp().getRequest().user;
    // console.log('getAll', this.reflector.getAll('roles', contexts));
    // console.log(
    //   'getAllAndMerge',
    //   this.reflector.getAllAndMerge('roles', contexts),
    // );
    // console.log(
    //   'getAllAndOverride',
    //   this.reflector.getAllAndOverride('roles', contexts),
    // );
    return requiredRoles.some((role) => user.role === role);
  }
}
