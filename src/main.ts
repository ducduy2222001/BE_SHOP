import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { BadRequestExceptionFilter } from './core/custom-response/bad-request.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BadRequestExceptionFilter());
  await app.listen(3000);
}
bootstrap();
