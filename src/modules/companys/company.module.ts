import { Module } from '@nestjs/common';
import { CompanyRepository } from './infra/typeorm/repositories/CompanyRepository';
import { Company } from './infra/typeorm/entities/Company';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCompanyService } from './services/create-company.service';
import { UserModule } from '../users/users.module';
import { CompanyController } from './infra/http/controllers/company.controller';
import { UpdateCompanyService } from './services/update-company.service';
import { ListCompanyService } from './services/list-companys.service';
import { DeleteCompanyService } from './services/delete-company.service';
import { ShowCompanyService } from './services/show-company.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [
    CompanyRepository,
    CreateCompanyService,
    UpdateCompanyService,
    ListCompanyService,
    DeleteCompanyService,
    ShowCompanyService,
  ],
})
export class CompanyModule {}
