import 'dotenv/config';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { Test } from '@nestjs/testing';

export async function loginForTests(email: string, password: string) {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  const { body } = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email: email, password: password })
    .expect(201);

  await app.close();

  return body.token as string;
}
