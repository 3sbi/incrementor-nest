import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PingService } from './ping.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsPingNumberLessByOne implements ValidatorConstraintInterface {
  constructor(protected readonly pingService: PingService) {}

  async validate(bodyNumber: number) {
    const ping = await this.pingService.findOneByBodyNumber(bodyNumber + 1);
    if (ping) {
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
