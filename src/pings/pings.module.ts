import { Module } from '@nestjs/common';
import { PingController } from './ping.controller';
import { PingService } from './ping.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ping } from './ping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ping])],
  controllers: [PingController],
  providers: [PingService],
})
export class PingsModule {}
