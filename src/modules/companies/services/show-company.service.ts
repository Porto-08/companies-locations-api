import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../infra/typeorm/repositories/CompanyRepository';
import { Company } from '../infra/typeorm/entities/Company';

@Injectable()
export class ShowCompanyService {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(id: number): Promise<Company> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new BadRequestException('Company not found');
    }

    return company;
  }
}
