import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from '../auth.service';
import * as PROTO from 'src/common/proto/authentication-service/auth.pb';
import * as DTO from 'src/auth/dto/auth.dto';
import { AuthenticatedRequest } from 'src/common/types/authenticated-request.types';
import { AuthGuard } from '../guards/auth.guard';

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

  @Get('me')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async findMe(@Req() req: AuthenticatedRequest): Promise<PROTO.FindUserByIdResponse> {
    const { userId } = req;

    const { data, error, status } = await this.authService.findUserById({ userId });

    if (data && data.user) {
      data.user = new DTO.UserDto(data.user);
    }

    return { data, error, status };
  }
}
