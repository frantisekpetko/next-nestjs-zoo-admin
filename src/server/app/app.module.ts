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
      useFactory: async (configService: ConfigService) => ({
        type: 'sqlite',
        database: process.cwd() + configService.get<string>('DATABASE_URL'),
        logging: true,
        autoLoadEntities: true,
        synchronize: true,
        //entities: ["src/entity/**/*.ts"],
        entities: ['dist/**/*.entity.js'],
        migrations: ['src/migration/**/*.ts'],
        subscribers: ['src/subscriber/**/*.ts'],
        cli: {
          entitiesDir: 'src/server/entity',
          migrationsDir: 'src/server/migration',
          subscribersDir: 'src/server/subscriber',
        },
        ssl:
          configService.get<string>('NODE_ENV') === 'production'
            ? { rejectUnauthorized: false }
            : false,
      }),
      inject: [ConfigService],
    }),
    ConsoleModule,
    AuthModule,
    UsersModule,
    ThingsModule,
    OrdersModule,
    StuffModule,
    SharedModule
  ],
  providers: [SeedService, JwtAuthService, JwtService],
  controllers: [AppController],
})
export class AppModule {}
