import { Injectable } from '@nestjs/common';
import { CreatePingDto } from './createPingDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ping } from './ping.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Ping)
    private pingRepository: Repository<Ping>,
  ) {}

  async addPing(body: CreatePingDto): Promise<{ pongNumber: number }> {
    const ping = this.pingRepository.create(body);
    await this.pingRepository.insert(ping);
    return { pongNumber: body.bodyNumber + 1 };
  }
}
