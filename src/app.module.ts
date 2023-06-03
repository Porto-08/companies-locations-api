import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/users.module';
import { User } from './modules/users/infra/typeorm/entities/User';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './shared/middlewares/auth.middleware';
import { Company } from './modules/companies/infra/typeorm/entities/Company';
import { CompanyModule } from './modules/companies/company.module';
import { Location } from './modules/locations/infra/typeorm/entities/Location';
import { LocationModule } from './modules/locations/location.module';
import { db_constants } from './shared/config/constants/db_constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [User, Company, Location],
      host: db_constants.db_host,
      port: Number(db_constants.db_port),
      username: db_constants.db_username,
      password: db_constants.db_password,
      database: db_constants.db_database,
    }),
    UserModule,
    AuthModule,
    CompanyModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/users/create',
          method: RequestMethod.POST,
        },
        {
          path: '/auth/login',
          method: RequestMethod.POST,
        },
        {
          path: '/',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('*');
  }
}
