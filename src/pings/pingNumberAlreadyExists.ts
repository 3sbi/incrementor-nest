import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Ping } from './ping.entity';
import { MoreThan, Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsPingNumberNotRegistered implements ValidatorConstraintInterface {
  constructor(private readonly pingRepository: Repository<Ping>) {}

  validate(bodyNumber: any) {
    console.log('validating bodynumber:', bodyNumber);
    return this.pingRepository
      .findOne({
        where: { bodyNumber: MoreThan(bodyNumber) },
      })
      .then((ping) => ping === undefined);
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
