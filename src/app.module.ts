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
import { Company } from './modules/companys/infra/typeorm/entities/Company';
import { CompanyModule } from './modules/companys/company.module';
import { Location } from './modules/locations/infra/typeorm/entities/Location';
import { LocationModule } from './modules/locations/location.module';
import { LocationController } from './modules/locations/infra/http/controllers/location.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [User, Company, Location],
      synchronize: true,
      url: process.env.DATABASE_URL,
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
      )
      .forRoutes('*');
  }
}
