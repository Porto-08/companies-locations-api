import { Company } from 'src/modules/companys/infra/typeorm/entities/Company';

export interface ICreateLocation {
  name: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  company: Company;
}
