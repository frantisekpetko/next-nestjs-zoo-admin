import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  logger: Logger = new Logger(GoogleOauthStrategy.name);

  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: `${configService.get<string>('BACKEND_URL')}/api/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  /*
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id, name, emails } = profile;

    let user = await this.usersService.findOne({
      where: { provider: 'google', providerId: id },
    });
    if (!user) {
      user = await this.usersService.create({
        provider: 'google',
        providerId: id,
        name: name.givenName,
        username: emails[0].value,
      });
    }

    return user;
  }
  */

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, id } = profile;
    /*
    const user = {
      googleId: id,
      email: emails[0].valuehttp://localhost:8000/,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    };

    const jwt = await this.authService.validateOAuthLogin(user);
    done(null, jwt);
    */

    let user = await this.usersService.findOne({
      where: { provider: 'google', providerId: id },
    });
    if (!user) {
      user = await this.usersService.create({
        provider: 'google',
        providerId: id,
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value
      });
    }
    this.logger.debug(typeof user, JSON.stringify(user, null, 4))
    const token = this.jwtService.sign({ ...user });
    this.logger.debug('validate', {token})
    return token;
  }
}
