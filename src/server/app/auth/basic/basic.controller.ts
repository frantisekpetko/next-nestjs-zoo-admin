import { BasicService } from './basic.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  ValidationPipe,
} from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
//import { GetUser } from './get-user.decorator';
//import { User } from '../../../entity/user.entity';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('api/auth')
export class BasicController {
  constructor(private authService: BasicService) {}

  @Post('/signup')
  signUp(
    @Body(new ValidationPipe({ transform: true, exceptionFactory: (errors) => {
      return new BadRequestException(
        errors.map(err => Object.values(err.constraints).join(', '))
      );
    }})) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  singIn(
    @Body(ValidationPipe) authCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string; username: string }> {
    Logger.log('authCredentialsDto', authCredentialsDto);
    return this.authService.signIn(authCredentialsDto);
  }

  /*
    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        commands.log('user',user);
    }
    */
}
