import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CompanyRepository } from '../infra/typeorm/repositories/CompanyRepository';
import { ICreateCompany } from '../domain/models/ICreateCompany';
import { CreateCompanyDTO } from '../dtos/create-company.dto';
import e from 'express';
import { Company } from '../infra/typeorm/entities/Company';
import { UsersRepository } from 'src/modules/users/infra/typeorm/repositories/UsersRepository';

@Injectable()
export class CreateCompanyService {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,

    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(user_id: number, company: CreateCompanyDTO): Promise<Company> {
    const cnpjRegex = /^\d{14}$/;

    if (!cnpjRegex.test(company.cnpj)) {
      throw new BadRequestException('Invalid cnpj');
    }

    try {
      const companyExists = await this.companyRepository.findByCnpj(
        company.cnpj,
      );

      if (companyExists) {
        throw new BadRequestException('Company already exists');
      }

      const hasSameName = await this.companyRepository.findByName(company.name);

      if (hasSameName) {
        throw new BadRequestException(
          'There is already a company with this name',
        );
      }

      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new BadRequestException('User not found');
      }

      const newCompany: ICreateCompany = {
        ...company,
        cnpj: company.cnpj.replace(/\D/g, ''),
        user,
      };

      const createdCompany = await this.companyRepository.save(newCompany);

      return createdCompany;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }
}
