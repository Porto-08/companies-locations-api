import { CompanyPaginated } from '../../interfaces';
import { ICompany } from '../models/ICompany';
import { ICreateCompany } from '../models/ICreateCompany';

export interface ICompanyRepository {
  save(data: ICreateCompany): Promise<ICompany>;
  findByName(name: string): Promise<ICompany | undefined>;
  findById(id: number): Promise<ICompany | undefined>;
  findByCnpj(cnpj: string): Promise<ICompany | undefined>;
  list(): Promise<ICompany[]>;
  listPaginated(page: number, limit: number): Promise<CompanyPaginated>;
  listPaginatedByUser(
    page: number,
    limit: number,
    userId: number,
  ): Promise<CompanyPaginated>;
}
