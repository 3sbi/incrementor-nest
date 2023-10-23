import { Injectable, Response } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ping } from './ping.entity';
import { MoreThan, Repository } from 'typeorm';
import { CreatePingDto } from './createPingDto';

@Injectable()
export class PingService {
  constructor(
    @InjectRepository(Ping)
    private pingRepository: Repository<Ping>,
  ) {}

  async addPing(body: CreatePingDto): Promise<{ bodyNumber: number }> {
    const ping = this.pingRepository.create(body);
    return { bodyNumber: ping.bodyNumber + 1 };
  }
}
