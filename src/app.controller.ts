import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from './auth/decorators/role.decorator';
import { Role } from 'src/common/proto/authentication-service/auth.pb';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/role.guard';

@Controller()
export class AppController {
  @Get('health-check')
  healthCheck(): string {
    return 'ok';
  }

  @Get('protected')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  protected(): string {
    return 'ok';
  }
}
