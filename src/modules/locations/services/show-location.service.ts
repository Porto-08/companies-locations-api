import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LocationRepository } from '../infra/typeorm/repositories/LocationRepository';

@Injectable()
export class ShowLocationService {
  constructor(
    @Inject(LocationRepository)
    private readonly locationRepository: LocationRepository,
  ) {}

  async execute(id: number) {
    const locations = await this.locationRepository.findById(id);

    if (!locations) {
      throw new BadRequestException('Location not found');
    }

    return locations;
  }
}
