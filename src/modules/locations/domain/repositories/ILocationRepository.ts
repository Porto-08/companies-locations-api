import { LocationPaginated } from '../../interfaces';
import { ICreateLocation } from '../models/ICreateLocation';
import { ILocation } from '../models/ILocation';

export interface ILocationRepository {
  save(location: ICreateLocation): Promise<ILocation>;
  findById(id: number): Promise<ILocation | undefined>;
  findByName(name: string): Promise<ILocation | undefined>;
  findByCep(cep: string): Promise<ILocation | undefined>;
  findByCompany(company_id: number): Promise<ILocation[]>;
  delete(id: number): Promise<void>;
  list(): Promise<ILocation[]>;
  listPaginated(page: number, limit: number): Promise<LocationPaginated>;
  listPaginatedByCompany(
    page: number,
    limit: number,
    companyId: number,
  ): Promise<LocationPaginated>;
}
