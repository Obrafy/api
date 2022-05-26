import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import * as PROTO from 'src/common/proto/authentication-service/auth.pb';

@Injectable()
export class AuthService {
  private authServiceClient: PROTO.AuthServiceClient;
  private userManagementServiceClient: PROTO.UserManagementServiceClient;

  @Inject(PROTO.AUTH_PACKAGE_NAME)
  private readonly grpcClient: ClientGrpc;

  /**
   * This runs once when the module's instantiate the service.
   *
   * {@link https://docs.nestjs.com/fundamentals/lifecycle-events#lifecycle-events-1 Documentation}
   */
  public onModuleInit(): void {
    this.authServiceClient = this.grpcClient.getService<PROTO.AuthServiceClient>(PROTO.AUTH_SERVICE_NAME);
    this.userManagementServiceClient = this.grpcClient.getService<PROTO.UserManagementServiceClient>(
      PROTO.USER_MANAGEMENT_SERVICE_NAME,
    );
  }

  /**
   * Validates a token string
   * @param token - The token to be validated
   * @returns The validation response
   */
  public async validate(token: string): Promise<PROTO.ValidateResponse> {
    return firstValueFrom(this.authServiceClient.validate({ token }));
  }

  /**
   * Finds a user by its id
   * @param userId - The id of the user to be found
   * @returns The user object
   */
  public async findUserById(userId: string): Promise<PROTO.FindUserByIdResponse> {
    return firstValueFrom(this.userManagementServiceClient.findUserById({ userId }));
  }
}
