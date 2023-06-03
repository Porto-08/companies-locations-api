import { UpdateCompanyDTO } from '../dtos/update-company.dto';
import { Company } from '../infra/typeorm/entities/Company';
import { CompanyRepository } from '../infra/typeorm/repositories/CompanyRepository';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { DefaultOutput } from '../interfaces';

@Injectable()
export class UpdateCompanyService {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(
    company_id: number,
    company: UpdateCompanyDTO,
  ): Promise<DefaultOutput> {
    const companyExists = await this.companyRepository.findById(company_id);

    if (!companyExists) {
      throw new BadRequestException('Company not found');
    }

    Object.assign(companyExists, company);

    const companyUpdated = await this.companyRepository.save(companyExists);

    return {
      id: companyUpdated.id,
      name: companyUpdated.name,
      cnpj: companyUpdated.cnpj,
      website: companyUpdated.website,
      user_id: companyUpdated.user.id,
    };
  }
}
