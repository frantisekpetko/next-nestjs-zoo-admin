import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { SeedService } from 'src/server/console/seed.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThingsModule } from './things/things.module';
import { OrdersModule } from './orders/orders.module';
import { StuffModule } from './stuff/stuff.module';
import { JwtAuthService } from './auth/jwt/jwt-auth.service';
import { JwtService } from '@nestjs/jwt';
import { SharedModule } from './shared/shared.module';
import { AnimalsModule } from './animals/animals.module';
import { CommandsService } from './commands/commands.service';
import config from 'ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: { settings: { 'request.credentials': 'include' } },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => (
        config
      ),
      inject: [ConfigService],
    }),
    ConsoleModule,
    AuthModule,
    UsersModule,
    ThingsModule,
    OrdersModule,
    StuffModule,
    AnimalsModule
  ],
  providers: [SeedService, JwtAuthService, JwtService, CommandsService],
  controllers: [AppController],
})
export class AppModule {}
