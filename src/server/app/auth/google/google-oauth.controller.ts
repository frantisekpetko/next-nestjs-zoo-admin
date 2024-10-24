import { Controller, Get, Req, Res, UnauthorizedException, UseGuards, Logger} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('api/auth/google')
export class GoogleOauthController {
  /*
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user);
    res.cookie(SESSION_COOKIE_KEY, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    return res.redirect('/profile');
  }
  */

  logger = new Logger(GoogleOauthController.name);
  
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtAuthService: JwtAuthService
  ) {}

  // Initiates the Google OAuth flow
  @Get('')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Initiates Google OAuth login flow
  }

  // Handles the OAuth callback from Google
  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const jwt = req.user as unknown;
    this.logger.debug('callback', jwt);
    if (!jwt) {
      throw new UnauthorizedException();
    }
    this.logger.debug('callback cookie');
    // Set the JWT as an HTTP-only cookie
    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
      sameSite: 'lax',
      path: '/',
    });
    // Redirect to the frontend application
    res.redirect(`${this.configService.get<string>('FRONTEND_URL')}/auth/callback?token=${jwt}`);
  }

  @Get('token')
  getToken(@Req() req: Request, @Res() res: Response) {
    const token = req.user;
    this.logger.debug('check token', JSON.stringify({ token: token }, null, 4));
    return { token: token };
  }

  // Protected route example
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
