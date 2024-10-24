import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/server/common/types/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  logger: Logger = new Logger(FacebookStrategy.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {
    super({
      clientID: configService.get<string>('FACEBOOK_APP_ID'),
      clientSecret: configService.get<string>('FACEBOOK_APP_SECRET'),
      callbackURL: 'http://localhost:8000/api/auth/facebook/redirect',
      profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
      scope: ['email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, emails, name,  photos  } = profile;
    this.logger.log(JSON.stringify(profile, null, 4));
    if (!profile) {
      throw new UnauthorizedException('Invalid Facebook credentials');
    }

    let user: User = await this.usersService.findOne({
      where: { provider: 'facebook', providerId: id },
    });
    if (!user) {
      user = await this.usersService.create({
        providerId: id,
        provider: 'facebook',
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
    //return this.usersService.validateUser(user);
  }
}