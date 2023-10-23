import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { PingNumberNotRegistered } from './pingNumberAlreadyExists';

export class CreatePingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @PingNumberNotRegistered()
  bodyNumber: number;
}
