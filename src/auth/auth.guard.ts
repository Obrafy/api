import { CanActivate, ExecutionContext, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  public readonly authService: AuthService;

  public async canActivate(context: ExecutionContext): Promise<boolean> | never {
    const req: Request & { user: string } = context.switchToHttp().getRequest();
    const authHeader: string = req.headers['authorization'];

    // If no authentication header is found, bail.
    if (!authHeader) throw new UnauthorizedException();

    const bearer: string[] = authHeader.split(' ');

    // If authentication header not in expected bearer format, also bail.
    if (!bearer || bearer.length < 2) throw new UnauthorizedException();

    const token = bearer[1];

    const { status, userId } = await this.authService.validate(token);

    req.user = userId;

    // If authentication isn't successfull bail.
    if (status !== HttpStatus.OK) throw new UnauthorizedException();

    return true;
  }
}
