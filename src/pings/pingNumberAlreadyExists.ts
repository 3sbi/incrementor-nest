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
export class IsPingNumberNotRegistered implements ValidatorConstraintInterface {
  constructor(
    protected readonly pingService: PingService,
    protected readonly logger: Logger,
  ) {}

  async validate(bodyNumber: any) {
    if (typeof bodyNumber !== 'number') {
      this.logger.error('param bodyNumber is not number');
      throw new BadRequestException('param bodyNumber is not number');
    }
    const ping = await this.pingService.findOneByBodyNumber(bodyNumber);
    if (ping) {
      this.logger.error('bodyNumber already exists');
      throw new BadRequestException('bodyNumber already exists');
    }
    return true;
  }
}

export function PingNumberNotRegistered(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPingNumberNotRegistered,
    });
  };
}
