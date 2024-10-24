import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';
import { ServerModule } from 'src/server/server.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  const configService = app.get(ConfigService);
  
  app.use(cookieParser());

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const logger = new Logger('main.ts');
  const port = process.env.PORT || 8000;

  await app.listen(port, () => logger.log(`App was started at port ${port}`));
}
bootstrap();
