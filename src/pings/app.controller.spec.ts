import { Test, TestingModule } from '@nestjs/testing';
import { PingController } from './ping.controller';
import { PingService } from './ping.service';

describe('PingController', () => {
  let pingController: PingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PingController],
      providers: [PingService],
    }).compile();

    pingController = app.get<PingController>(PingController);
  });
  it('should return bodyNumber+1', () => {
    expect(pingController.createPing({ bodyNumber: 11 })).toBe({
      bodyNumber: 12,
    });
  });

  it('should return bodyNumber+1', () => {
    expect(pingController.createPing({ bodyNumber: 11 })).toBe({
      bodyNumber: 12,
    });
  });
});
