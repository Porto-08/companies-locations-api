import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LocationRepository } from '../infra/typeorm/repositories/LocationRepository';
import { UpdateLocationDTO } from '../dtos/update-location.dto';

@Injectable()
export class UpdateLocationService {
  constructor(
    @Inject(LocationRepository)
    private readonly locationRepository: LocationRepository,
  ) {}

  async execute(location_id: number, location: UpdateLocationDTO) {
    const locationExists = await this.locationRepository.findById(location_id);

    if (!locationExists) {
      throw new BadRequestException('Location not found');
    }

    Object.assign(locationExists, location);

    await this.locationRepository.save(locationExists);

    return locationExists;
  }
}
