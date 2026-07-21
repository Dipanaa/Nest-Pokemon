import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // prefix de endpoint
  app.setGlobalPrefix("api");
  

  // Configuracion para el parseo de los datos en base a los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,  // CUIDADO con las transformaciones implicitas de nest en el validation pipe porque usan mas memoria
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
