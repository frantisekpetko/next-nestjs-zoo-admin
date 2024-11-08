import { User } from './../../../entity/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import source from 'ormconfig';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BasicService {
  private logger = new Logger('AuthService');

  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; username: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    console.log('username', username);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );
    return { accessToken, username };
  }
}
