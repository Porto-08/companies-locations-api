import 'dotenv/config';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../../app.module';
import { loginForTests } from '../../../../shared/config/test/login';
import { generateRandomCpnj } from '../../../../shared/utils/generateRandomCpnj';

describe('Companies Controller', () => {
  let app: INestApplication;
  let token: string;
  let company_id: number;
  let user_id: number;

  const user = {
    email: 'samuelalcala2001@outlook.com',
    password: '123456',
  };

  const randomCnpj = generateRandomCpnj();
  const company = {
    name: `Recode Pro ${randomCnpj}`,
    cnpj: randomCnpj,
    website: 'recode.com',
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

  it('/companies (GET)', async () => {
    await request(app.getHttpServer())
      .get('/companies')
      .query({
        page: 1,
        limit: 10,
      })
      .set('Authorization', 'bearer ' + token)
      .expect(200);
  });

  it('/companies/create (POST)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/companies/create')
      .send(company)
      .set('Authorization', 'bearer ' + token)
      .expect(201);

    company_id = body.id;
    user_id = body.user.id;
  });

  it('/companies/user/:id (GET)', async () => {
    await request(app.getHttpServer())
      .get(`/companies/user/${user_id}`)
      .query({
        page: 1,
        limit: 10,
      })
      .set('Authorization', 'bearer ' + token)
      .expect(200);
  });

  it('/companies/:id (GET)', async () => {
    await request(app.getHttpServer())
      .get(`/companies/${user_id}`)
      .set('Authorization', 'bearer ' + token)
      .expect(200);
  });

  it('/companies/update/:id (PUT)', async () => {
    await request(app.getHttpServer())
      .put(`/companies/update/${company_id}`)
      .send({
        cnpj: generateRandomCpnj(),
      })
      .set('Authorization', 'bearer ' + token)
      .expect(200);
  });

  it('/companies/delete/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/companies/delete/${company_id}`)
      .set('Authorization', 'bearer ' + token)
      .expect(200);
  });
});
