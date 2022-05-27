import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from '../auth.service';
import * as PROTO from 'src/common/proto/authentication-service/auth.pb';
import * as DTO from 'src/auth/dto/auth.dto';
import { RolesGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';

@Controller()
@UseGuards(AuthGuard)
export class UserManagementController {
  constructor(private authService: AuthService) {}

  // Base User Management
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user/:id/')
  private async findUser(@Param('id') userId: DTO.FindUserRequestDto['userId']): Promise<PROTO.FindUserByIdResponse> {
    const { data, error, status } = await this.authService.findUserById({ userId });

    if (data && data.user) {
      data.user = new DTO.UserDto(data.user);
    }

    return { data, error, status };
  }

  @Delete('user/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  private async removeUser(
    @Param('id') userId: DTO.RemoveUserRequestDto['userId'],
  ): Promise<PROTO.AddRoleToUserResponse> {
    return this.authService.removeUser({ userId });
  }

  // User Status Management
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

  // Role Management
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
}
