import { BadRequestException, Injectable } from '@nestjs/common';
import { ICompanyRepository } from 'src/modules/companys/domain/repositories/ICompanyRepository';
import { Company } from '../entities/Company';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateCompany } from 'src/modules/companys/domain/models/ICreateCompany';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findById(id: number): Promise<Company | undefined> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['user', 'locations'],
    });

    if (!company) {
      return undefined;
    }

    return company;
  }

  async findByName(name: string): Promise<Company | undefined> {
    const company = await this.companyRepository.findOne({
      where: { name },
    });

    if (!company) {
      return undefined;
    }

    return company;
  }

  async findByCnpj(cnpj: string): Promise<Company | undefined> {
    const company = await this.companyRepository.findOne({
      where: { cnpj },
    });

    if (!company) {
      return undefined;
    }

    return company;
  }

  async save(company: ICreateCompany): Promise<Company> {
    const newCompany = await this.companyRepository.save(company);

    return newCompany;
  }

  async delete(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }

  async list(): Promise<Company[]> {
    const companys = await this.companyRepository.find({
      relations: ['user', 'locations'],
    });

    return companys;
  }
}
