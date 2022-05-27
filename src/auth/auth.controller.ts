import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import * as PROTO from 'src/common/proto/authentication-service/auth.pb';
import * as DTO from 'src/auth/dto/auth.dto';

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

  @Put('user/:id/roles')
  private async addRoleToUser(
    @Param('id') userId: DTO.AddRoleToUserRequestDto['userId'],
    @Body('role') role: DTO.AddRoleToUserRequestDto['role'],
  ): Promise<PROTO.AddRoleToUserResponse> {
    return this.authService.addRoleToUser({ userId, role });
  }

  @Delete('user/:id/roles')
  private async removeRoleFromUser(
    @Param('id') userId: DTO.RemoveRoleFromUserRequestDto['userId'],
    @Body('role') role: DTO.RemoveRoleFromUserRequestDto['role'],
  ): Promise<PROTO.AddRoleToUserResponse> {
    return this.authService.removeRoleFromUser({ userId, role });
  }

  @Delete('user/:id')
  private async removeUser(
    @Param('id') userId: DTO.RemoveUserRequestDto['userId'],
  ): Promise<PROTO.AddRoleToUserResponse> {
    return this.authService.removeUser({ userId });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user/:id/')
  private async findUser(
    @Param('id') userId: DTO.FindUserRequestDto['userId'],
  ): Promise<PROTO.FindUserByEmailResponse> {
    const { data, error, status } = await this.authService.findUserById({ userId });

    if (data && data.user) {
      data.user = new DTO.UserDto(data.user);
    }

    return { data, error, status };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('users')
  private async findAllUsers(
    @Body() payload: DTO.FindAllUsersRequestDto,
    @Query('roles') roles: DTO.FindAllUsersForRolesRequestDto['roles'],
  ): Promise<PROTO.FindAllUsersResponse> {
    const { data, error, status } = await this.authService.findAllUsers({ ...payload, roles });

    if (data && data.users && data.users.length > 0) {
      data.users = data.users.map((user) => new DTO.UserDto(user));
    }

    return { data, error, status };
  }
}
