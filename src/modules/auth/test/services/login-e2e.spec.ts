import 'dotenv/config';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../../auth.module';
import { AppModule } from '../../../../app.module';

describe('LoginController (e2e)', () => {
  let app: INestApplication;
  const user = {
    email: 'samuelalcala2001@outlook.com',
    password: '123456',
  };

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AuthModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(201);
  });
});
