import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { jwtAuthGuard } from './auth/guards/jwt_auth.guard';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new jwtAuthGuard(reflector));

  //swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Shopie App')
    .setDescription('API documentation for the Shopie app')
    .setVersion('1.0')
    .addBearerAuth() //enables jwt auth support
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
