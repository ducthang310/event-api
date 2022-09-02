import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TrimPipe } from './common/pipes/trim.pipe';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new TrimPipe(),
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.use(json({ limit: '20mb' }));
  app.use(urlencoded({ limit: '20mb', extended: true }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Event API')
    .setDescription('This document describes Event RESTful API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log('Server is listening on: ', port);
}
bootstrap();
