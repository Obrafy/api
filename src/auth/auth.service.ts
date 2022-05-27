import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import * as PROTO from 'src/common/proto/authentication-service/auth.pb';
import * as DTO from 'src/auth/dto/auth.dto';

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
   * @param params.userId - The id of the user to be found
   * @returns The user object
   */
  public async findUserById(payload: DTO.FindUserRequestDto): Promise<PROTO.FindUserByIdResponse> {
    return await firstValueFrom(this.userManagementServiceClient.findUserById(payload));
  }

  /**
   * Register a new user
   * @param params.email - The new user's email
   * @param params.password - The new user's password
   * @returns The new user id
   */
  public async register(payload: DTO.RegisterRequestDto): Promise<PROTO.RegisterResponse> {
    return firstValueFrom(this.authServiceClient.register(payload));
  }

  /**
   * log a user in
   * @param params.email - The user's email
   * @param params.password - The user's password
   * @returns The authentication token
   */
  public async login(payload: DTO.LoginRequestDto): Promise<PROTO.LoginResponse> {
    return firstValueFrom(this.authServiceClient.login(payload));
  }

  /**
   * Activates a user
   * @param params.userId - The user's id
   */
  public async activateUser(payload: DTO.ActivateUserRequestDto): Promise<PROTO.ActivateUserByIdResponse> {
    return firstValueFrom(this.userManagementServiceClient.activateUserById(payload));
  }

  /**
   * Deactivates a user
   * @param params.userId - The user's id
   */
  public async deactivateUser(payload: DTO.DeactivateUserRequestDto): Promise<PROTO.DeactivateUserByIdResponse> {
    return firstValueFrom(this.userManagementServiceClient.deactivateUserById(payload));
  }
}
