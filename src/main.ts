import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import {
  BadRequestExceptionFilter,
  ResponseInterceptor,
} from './core/custom-response/bad-request.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BadRequestExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
