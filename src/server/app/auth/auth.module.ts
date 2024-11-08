import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleOauthModule } from './google/google-oauth.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { CognitoOauthModule } from './cognito/cognito-oauth.module';
import { FacebookOauthModule } from './facebook/facebook-oauth.module';
import { BasicModule } from './basic/basic.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    GoogleOauthModule,
    JwtAuthModule,
    CognitoOauthModule,
    FacebookOauthModule,
    BasicModule
  ],
})
export class AuthModule {}
