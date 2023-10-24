import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PingsModule } from '../src/pings/pings.module';

describe('PingController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PingsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/v1/pings (POST)', () => {
    return request(app.getHttpServer())
      .post('/v1/pings')
      .send({ bodyNumber: 11 })
      .expect(201)
      .expect({ bodyNumber: 12 });
  });

  it('check if already exists', () => {
    return request(app.getHttpServer())
      .post('/v1/pings')
      .send({ bodyNumber: 11 })
      .expect(400);
  });

  it('check if bodyNumber is less by one than existing number', () => {
    return request(app.getHttpServer())
      .post('/v1/pings')
      .send({ bodyNumber: 10 })
      .expect(400);
  });
});
