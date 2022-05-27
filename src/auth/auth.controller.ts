import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { AuthService } from './auth.service';
import * as PROTO from 'src/common/proto/authentication-service/auth.pb';
import * as DTO from 'src/auth/dto/auth.dto';
import Long from 'long';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  private async register(@Body() body: DTO.RegisterRequestDto): Promise<PROTO.RegisterResponse> {
    return this.authService.register(body);
  }

  @Put('login')
  private async login(@Body() body: DTO.LoginRequestDto): Promise<PROTO.LoginResponse> {
    return this.authService.login(body);
  }

  @Put('user/:id/activate')
  private async activateUser(
    @Param('id') userId: DTO.ActivateUserRequestDto['userId'],
  ): Promise<PROTO.ActivateUserByIdResponse> {
    return this.authService.activateUser({ userId });
  }

  @Put('user/:id/deactivate')
  private async deactivateUser(
    @Param('id') userId: DTO.DeactivateUserRequestDto['userId'],
  ): Promise<PROTO.DeactivateUserByIdResponse> {
    return this.authService.deactivateUser({ userId });
  }

  @Get('user/:id/')
  private async findUser(
    @Param('id') userId: DTO.DeactivateUserRequestDto['userId'],
  ): Promise<PROTO.DeactivateUserByIdResponse['data']> {
    return await this.authService.findUserById({ userId });
  }

  // @Put(':id/role')
  // private async updateUserRole(
  //   @Param('id') id: UpdateUserRoleRequest['userId'],
  //   @Body() body: Omit<UpdateUserRoleRequest, 'userId'>,
  // ): Promise<Observable<UpdateUserRoleResponse>> {
  //   return this.authServiceClient.updateUserRole({ userId: id, roles: body.roles });
  // }
}
