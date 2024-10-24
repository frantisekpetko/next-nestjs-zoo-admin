import { Controller, Get, Logger, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('api/auth/facebook')
export class FacebookOauthController {
  private logger: Logger = new Logger(FacebookOauthController.name);

  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly configService: ConfigService
  ) { }

  @Get()
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<void> {
    this.logger.log('facebook');
    // Initiates Facebook OAuth login
  }

  @Get('/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookRedirect(@Req() req, @Res() res) {
    const jwt = req.user as unknown;
    //this.logger.log({user})
    //const payload = { email: user.email, sub: user.providerId };
    //const token = this.jwtService.sign({ ...user });
    return res.redirect(`http://localhost:8000/auth/callback/facebook?token=${jwt}`);
  }

  @Get('protected')
  async getProtected(@Req() req: Request) {
    const authHeader = req.headers.authorization;
    this.logger.debug({authHeader})
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authHeader.split(' ')[1];
    const user = await this.jwtAuthService.verifyToken(token);

    this.logger.log('protected', authHeader, token);
    //const user = req.user;
    this.logger.debug('check user', JSON.stringify({user: user}, null, 4))
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return { message: 'This is a protected route', user };
  }

  // Logout endpoint to clear the JWT cookie
  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt');
    res.redirect(this.configService.get<string>('FRONTEND_URL'));
  }
}