import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreatePingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  bodyNumber: number;
}
