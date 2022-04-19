import { Body, Controller, Inject, Post, Put } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AuthServiceClient,
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from './dto/proto/auth.pb';

@Controller('auth')
export class AuthController {
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

  @Post('register')
  private async register(@Body() body: RegisterRequest): Promise<Observable<RegisterResponse>> {
    return this.authServiceClient.register(body);
  }

  @Put('login')
  private async login(@Body() body: LoginRequest): Promise<Observable<LoginResponse>> {
    return this.authServiceClient.login(body);
  }
}
