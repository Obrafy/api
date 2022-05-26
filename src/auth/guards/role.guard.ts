import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request.types';
import { AuthService } from 'src/auth/auth.service';
import { ROLES_KEY } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/common/proto/authentication-service/auth.pb';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  @Inject(AuthService)
  public readonly authService: AuthService;

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { userId } = context.switchToHttp().getRequest() as AuthenticatedRequest;

    const {
      data: { user },
    } = await this.authService.findUserById(userId);

    return user.roles.includes(Role.SUDO) || requiredRoles.some((role) => user.roles.includes(role));
  }
}
