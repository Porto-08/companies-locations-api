import { Injectable } from '@nestjs/common';
import { ICompanyRepository } from 'src/modules/companies/domain/repositories/ICompanyRepository';
import { Company } from '../entities/Company';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateCompany } from 'src/modules/companies/domain/models/ICreateCompany';
import { CompanyPaginated } from 'src/modules/companies/interfaces';

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
    const companies = await this.companyRepository.find({
      relations: ['user', 'locations'],
    });

    return companies;
  }

  async listPaginated(page: number, limit: number): Promise<CompanyPaginated> {
    const skip = (page - 1) * limit;

    const [companies, count] = await this.companyRepository.findAndCount({
      relations: ['user', 'locations'],
      skip,
      take: limit,
    });

    const next_page = limit * page < count ? page + 1 : null;
    const before_page = page !== 1 ? page - 1 : null;
    const total_locations = companies.reduce(
      (acc, company) => acc + company.locations.length,
      0,
    );

    return {
      data: companies as Company[],
      meta: {
        total: count,
        qtd_locations: total_locations,
        page,
        last_page: before_page,
        next_page,
      },
    };
  }

  async listPaginatedByUser(
    page: number,
    limit: number,
    userId: number,
  ): Promise<CompanyPaginated> {
    const skip = (page - 1) * limit;

    const [companies, count] = await this.companyRepository.findAndCount({
      relations: ['user', 'locations'],
      skip,
      take: limit,
      where: {
        user: {
          id: userId,
        },
      },
    });

    const next_page = limit * page < count ? page + 1 : null;
    const before_page = page !== 1 ? page - 1 : null;
    const total_locations = companies.reduce(
      (acc, company) => acc + company.locations.length,
      0,
    );

    return {
      data: companies as Company[],
      meta: {
        total: count,
        qtd_locations: total_locations,
        page,
        last_page: before_page,
        next_page,
      },
    };
  }
}
