import { ICompany } from '../models/ICompany';
import { ICreateCompany } from '../models/ICreateCompany';

export interface ICompanyRepository {
  save(data: ICreateCompany): Promise<ICompany>;
  findByName(name: string): Promise<ICompany | undefined>;
  findById(id: number): Promise<ICompany | undefined>;
  findByCnpj(cnpj: string): Promise<ICompany | undefined>;
  list(): Promise<ICompany[]>;
}
