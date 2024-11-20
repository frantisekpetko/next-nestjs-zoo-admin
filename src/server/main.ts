import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ServerModule } from 'src/server/server.module';
import { ConfigService } from '@nestjs/config';
import { CommandsService } from './app/commands/commands.service';
import { AppModule } from './app/app.module';
import source from 'ormconfig';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('main.ts');
  /*
  try {
    await source.initialize();
    logger.log("Data Source has been initialized!");
  } catch (err) {
    logger.error("Error during DataSource initialization", err);
    process.exit(1);  // Exit if DB connection fails
  }
  */

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException(
          errors.map(err => Object.values(err.constraints).join(', '))
        );
      },
    }),
  );

  app.use(cookieParser());

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });


  const port = process.env.PORT || 8000;
  await app.listen(port, async () => {
    await setupDatabase();
    logger.log(`App was started at port ${port}`)
  });

  //
}
bootstrap();

async function setupDatabase() {
  const app = await NestFactory.create(ServerModule);
  const commandsService = app.get(CommandsService);
  await commandsService.data();
  //await commandsService.getImages();
}
