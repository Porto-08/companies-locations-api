import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../infra/typeorm/repositories/CompanyRepository';

@Injectable()
export class DeleteCompanyService {
  constructor(
    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const companyExists = await this.companyRepository.findById(id);

    if (!companyExists) {
      throw new BadRequestException('Company not found');
    }

    await this.companyRepository.delete(id);
  }
}
