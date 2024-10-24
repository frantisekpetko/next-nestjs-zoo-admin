import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('api/private')
  getPrivate(@Request() req) {
    return req.user;
  }
}
