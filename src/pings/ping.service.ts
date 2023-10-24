import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ping } from './ping.entity';
import { Repository } from 'typeorm';
import { CreatePingDto } from './createPingDto';

@Injectable()
export class PingService {
  constructor(
    @InjectRepository(Ping)
    private pingRepository: Repository<Ping>,
  ) {}

  async addPing(body: CreatePingDto): Promise<{ bodyNumber: number }> {
    const ping = await this.pingRepository.create(body);
    await this.pingRepository.insert(ping);
    console.log(ping);
    console.log('count:', await this.pingRepository.count());
    return { bodyNumber: body.bodyNumber + 1 };
  }

  async findOneByBodyNumber(bodyNumber: number): Promise<Ping> {
    const ping = await this.pingRepository.findOne({ where: { bodyNumber } });
    return ping;
  }
}
