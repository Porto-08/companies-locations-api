import { Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../infra/typeorm/repositories/CompanyRepository';
import { Company } from '../infra/typeorm/entities/Company';

@Injectable()
export class ListCompanyService {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(): Promise<Company[]> {
    const companys = await this.companyRepository.list();

    return companys;
  }
}
