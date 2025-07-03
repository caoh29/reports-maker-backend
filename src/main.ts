import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // FOR DEVELOPMENT
  app.enableCors({
    origin: 'http://localhost:3000', // allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // FOR TRANSFORMING PAYLOADS OBJECTS GLOBALLY
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Reports Gen')
    .setDescription(
      'Generate pre-made reprots or custom report for your tailored needs!',
    )
    .setVersion('1.0')
    .addTag('reprots')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
