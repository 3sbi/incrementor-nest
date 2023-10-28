import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const statusCode = res.statusCode;
      if (statusCode === 400 || statusCode === 404 || statusCode === 405) {
        this.logger.error(
          `${new Date().toISOString()} [${req.method}] ${req.url} - `,
          JSON.stringify(req.body),
        );
      }
    });

    next();
  }
}
