import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  @Get('health-check')
  healthCheck(): string {
    return 'ok';
  }

  @Get('protected')
  @UseGuards(AuthGuard)
  protected(): string {
    return 'ok';
  }
}
