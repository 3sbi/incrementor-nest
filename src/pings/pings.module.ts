import { Logger, Module } from '@nestjs/common';
import { PingController } from './ping.controller';
import { PingService } from './ping.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ping } from './ping.entity';
import { IsPingNumberLessByOne } from './pingNumberLessByOne';
import { IsPingNumberNotRegistered } from './pingNumberAlreadyExists';

@Module({
  imports: [TypeOrmModule.forFeature([Ping])],
  controllers: [PingController],
  providers: [
    PingService,
    IsPingNumberLessByOne,
    IsPingNumberNotRegistered,
    Logger,
  ],
})
export class PingsModule {}
