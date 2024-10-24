import { Module } from '@nestjs/common';
import { UsersModule } from '../../users/users.module';
import { JwtAuthModule } from '../jwt/jwt-auth.module';
import { PassportModule } from '@nestjs/passport';
import { FacebookStrategy } from './facebook-oauth.strategy';
import { FacebookOauthController } from './facebook-oauth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'facebook' }),
    UsersModule,
    JwtAuthModule
  ],
  controllers: [FacebookOauthController],
  providers: [FacebookStrategy],
})
export class FacebookOauthModule {}