import { Body, Controller, Inject, Post, Put } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import * as PROTO from 'src/common/proto/authentication-service/auth.pb';

@Controller('auth')
export class AuthController {
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

  @Post('register')
  private async register(@Body() body: PROTO.RegisterRequest): Promise<Observable<PROTO.RegisterResponse>> {
    return this.authServiceClient.register(body);
  }

  @Put('login')
  private async login(@Body() body: PROTO.LoginRequest): Promise<Observable<PROTO.LoginResponse>> {
    return this.authServiceClient.login(body);
  }

  // @Put(':id/role')
  // private async updateUserRole(
  //   @Param('id') id: UpdateUserRoleRequest['userId'],
  //   @Body() body: Omit<UpdateUserRoleRequest, 'userId'>,
  // ): Promise<Observable<UpdateUserRoleResponse>> {
  //   return this.authServiceClient.updateUserRole({ userId: id, roles: body.roles });
  // }
}
