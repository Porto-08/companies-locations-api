import { Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../infra/typeorm/repositories/CompanyRepository';
import { DefaultOutput } from '../interfaces';

@Injectable()
export class ListCompanyService {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(): Promise<DefaultOutput[]> {
    const companys = await this.companyRepository.list();

    const companysFormatted = companys.map((company) => {
      return {
        id: company.id,
        name: company.name,
        cnpj: company.cnpj,
        website: company.website,
        user_id: company.user.id,
      };
    });

    return companysFormatted;
  }
}
