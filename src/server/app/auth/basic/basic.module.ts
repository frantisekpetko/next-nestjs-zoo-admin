import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BasicController } from './basic.controller';
import { BasicService } from './basic.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    })
  ],
  controllers: [BasicController],
  providers: [BasicService, JwtStrategy, UserRepository],
  exports: [JwtStrategy, PassportModule],
})
export class BasicModule {}
