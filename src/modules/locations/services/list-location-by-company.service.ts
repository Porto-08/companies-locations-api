import { Inject, Injectable } from '@nestjs/common';
import { LocationRepository } from '../infra/typeorm/repositories/LocationRepository';

@Injectable()
export class ListLocationByCompanyService {
  constructor(
    @Inject(LocationRepository)
    private readonly locationRepository: LocationRepository,
  ) {}

  async execute(page: number, limit: number, companyId: number) {
    const locations = await this.locationRepository.listPaginatedByCompany(
      page,
      limit,
      companyId,
    );

    return locations;
  }
}
