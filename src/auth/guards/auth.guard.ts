import { CanActivate, ExecutionContext, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request.types';
import { AuthService } from '../auth.service';

const AUTHORIZATION_HEADER_KEY = 'authorization';
const AUTHORIZATION_HEADER_TOKEN_SEPARATOR = ' ';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  public readonly authService: AuthService;

  public async canActivate(context: ExecutionContext): Promise<boolean> | never {
    const req: AuthenticatedRequest = context.switchToHttp().getRequest();
    const authHeader: string = req.headers[AUTHORIZATION_HEADER_KEY];

    // If no authentication header is found, bail.
    if (!authHeader) throw new UnauthorizedException();

    const bearer: string[] = authHeader.split(AUTHORIZATION_HEADER_TOKEN_SEPARATOR);

    // If authentication header not in expected bearer format, also bail.
    if (!bearer || bearer.length < 2) throw new UnauthorizedException();

    const token = bearer[1];

    const { status, data } = await this.authService.validate(token);

    req.userId = data.userId;

    // If authentication isn't successfull bail.
    if (status !== HttpStatus.OK) throw new UnauthorizedException();

    return true;
  }
}
