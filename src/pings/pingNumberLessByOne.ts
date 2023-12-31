import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PingService } from './ping.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsPingNumberLessByOne implements ValidatorConstraintInterface {
  constructor(
    protected readonly pingService: PingService,
    protected readonly logger: Logger,
  ) {}

  async validate(bodyNumber: any) {
    if (typeof bodyNumber !== 'number') {
      throw new BadRequestException('param bodyNumber is not number');
    }
    const ping = await this.pingService.findOneByBodyNumber(bodyNumber + 1);
    if (ping) {
      this.logger.error('bodyNumber one less than the existing number');
      throw new BadRequestException(
        'bodyNumber one less than the existing number',
      );
    }
    return true;
  }
}

export function PingNumberLessByOne(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPingNumberLessByOne,
    });
  };
}
