import { Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../infra/typeorm/repositories/CompanyRepository';
import { CompanyPaginated } from '../interfaces';

@Injectable()
export class GetCompanyPerUserService {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(
    page: number,
    limit: number,
    userId: number,
  ): Promise<CompanyPaginated> {
    const companies = await this.companyRepository.listPaginatedByUser(
      page,
      limit,
      userId,
    );

    return companies;
  }
}
