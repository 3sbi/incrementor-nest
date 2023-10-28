import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePingDto } from './createPingDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/ping')
  @HttpCode(200)
  createPing(@Body() body: CreatePingDto) {
    return this.appService.addPing(body);
  }
}
