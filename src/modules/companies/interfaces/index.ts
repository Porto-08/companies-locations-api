import { Company } from '../infra/typeorm/entities/Company';

export interface DefaultOutput {
  id: number;
  name: string;
  cnpj: string;
  website: string;
  user_id: number;
}

export interface CompanyPaginated {
  data: Company[];
  meta: {
    total: number;
    qtd_locations: number;
    page: number;
    last_page: number | null;
    next_page?: number | null;
  };
}
