import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FirstInterceptor } from "./interceptors/first.interceptor";
import { FormatInterceptor } from "./interceptors/format.interceptor";

const secondMid = (req, res, next) => {
  console.log('second');
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new FirstInterceptor(), new FormatInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  // app.use('first/premier', secondMid);
  app.enableCors({
    origin: 'http://localhost:4200'
  });
  await app.listen(3000);
}
bootstrap();
