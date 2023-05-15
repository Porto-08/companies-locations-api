import { Inject, Injectable } from '@nestjs/common';
import { LocationRepository } from '../infra/typeorm/repositories/LocationRepository';

@Injectable()
export class ListLocationService {
  constructor(
    @Inject(LocationRepository)
    private readonly locationRepository: LocationRepository,
  ) {}

  async execute(page: number, limit: number) {
    const locations = await this.locationRepository.listPaginated(page, limit);

    return locations;
  }
}
