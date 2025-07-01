import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // FOR DEVELOPMENT
  app.enableCors({
    origin: 'http://localhost:3000', // allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  const config = new DocumentBuilder()
    .setTitle('Employee Management')
    .setDescription('The employee management API description')
    .setVersion('1.0')
    .addTag('employees')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
