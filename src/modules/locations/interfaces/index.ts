import { Location } from '../infra/typeorm/entities/Location';

export interface LocationPaginated {
  data: Location[];
  meta: {
    total: number;
    page: number;
    last_page: number | null;
    next_page?: number | null;
  };
}
