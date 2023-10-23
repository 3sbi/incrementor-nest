import { Body, Controller, Post } from '@nestjs/common';
import { PingService } from './ping.service';
import { Ping } from './ping.entity';
import { CreatePingDto } from './createPingDto';

@Controller({
  path: 'pings',
  version: '1',
})
export class PingController {
  constructor(private readonly pingService: PingService) {}

  @Post()
  createUser(@Body() body: CreatePingDto) {
    return this.pingService.addPing(body);
  }
}
