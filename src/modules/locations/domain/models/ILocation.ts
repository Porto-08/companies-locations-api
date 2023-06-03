import { Company } from '../../../companies/infra/typeorm/entities/Company';

export interface ILocation {
  id: number;
  name: string;
  cep: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  created_at: Date;
  updated_at: Date;
  company: Company;
}
