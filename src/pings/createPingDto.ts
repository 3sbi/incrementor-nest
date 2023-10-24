import { IsDefined, IsInt, IsNotEmpty, Min } from 'class-validator';
import { PingNumberNotRegistered } from './pingNumberAlreadyExists';
import { PingNumberLessByOne } from './pingNumberLessByOne';

export class CreatePingDto {
  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @PingNumberNotRegistered()
  @PingNumberLessByOne()
  bodyNumber: number;
}
