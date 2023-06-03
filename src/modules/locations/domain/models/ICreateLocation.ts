import { Company } from 'src/modules/companies/infra/typeorm/entities/Company';

export interface ICreateLocation {
  name: string;
  cep: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  company: Company;
}
