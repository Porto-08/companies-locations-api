import { Inject, Injectable } from '@nestjs/common';
import { LocationRepository } from '../infra/typeorm/repositories/LocationRepository';

@Injectable()
export class DeleteLocationService {
  constructor(
    @Inject(LocationRepository)
    private readonly locationRepository: LocationRepository,
  ) {}

  async execute(id: number) {
    await this.locationRepository.delete(id);
  }
}
