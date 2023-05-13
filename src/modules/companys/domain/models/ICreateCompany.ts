import { User } from '../../../users/infra/typeorm/entities/User';

export class ICreateCompany {
  name: string;
  website: string;
  cnpj: string;
  user: User;
}
