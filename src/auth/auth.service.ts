import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthServiceClient, AUTH_SERVICE_NAME, ValidateResponse } from './dto/proto/auth.pb';

@Injectable()
export class AuthService {
  private authServiceClient: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly grpcClient: ClientGrpc;

  /**
   * This runs once when the module's instantiate the service.
   *
   * {@link https://docs.nestjs.com/fundamentals/lifecycle-events#lifecycle-events-1 Documentation}
   */
  public onModuleInit(): void {
    this.authServiceClient = this.grpcClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  /**
   * Validates a token string
   * @param token - The token to be validated
   * @returns The validation response
   */
  public async validate(token: string): Promise<ValidateResponse> {
    return firstValueFrom(this.authServiceClient.validate({ token }));
  }
}
