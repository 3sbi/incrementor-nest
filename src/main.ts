import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { useContainer } from 'class-validator';
import * as compression from 'compression';

const PORT = parseInt(process.env.PORT, 10) || 3000;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn'],
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
    process.exit();
  }
}

bootstrap();
