import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { useContainer } from 'class-validator';
import * as compression from 'compression';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';

const PORT = parseInt(process.env.PORT, 10) || 3000;

async function bootstrap() {
  try {
    const instance = winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      ],
    });
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger({
        instance,
      }),
    });
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.enableCors({ origin: '*' });
    app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true }));
    app.enableVersioning({ type: VersioningType.URI });
    app.use(helmet());
    app.use(compression());

    await app.listen(PORT, () => {
      console.log(`🚀 Application running at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

bootstrap();
