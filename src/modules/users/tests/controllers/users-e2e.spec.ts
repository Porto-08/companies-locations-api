import 'dotenv/config';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../../app.module';
import { loginForTests } from '../../../../shared/config/test/login';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let user_id: number;

  const user = {
    email: 'samuelalcala2001@outlook.com',
    password: '123456',
  };

  beforeAll(async () => {
    token = await loginForTests(user.email, user.password);
  });

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', 'bearer ' + token)
      .expect(200);
  });

  it('/users/create (POST)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/users/create')
      .send({
        name: 'Isabelle',
        email: `isarosario${Math.round(Math.random() * 1000)}@email.com`,
        password: '123456',
      })
      .set('Authorization', 'bearer ' + token)
      .expect(201);

    user_id = body.id;
  });

  it('/users/update/:id (PUT)', async () => {
    await request(app.getHttpServer())
      .put(`/users/update/${user_id}`)
      .send({
        name: `Isabelle${Math.round(Math.random() * 1000)}`,
        email: `isarosario${Math.round(Math.random() * 1000)}@email.com`,
      })
      .set('Authorization', 'bearer ' + token)
      .expect(200);
  });

  it('/users/update/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/users/delete/${user_id}`)
      .set('Authorization', 'bearer ' + token)
      .expect(200);
  });
});
