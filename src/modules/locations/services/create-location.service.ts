import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LocationRepository } from '../infra/typeorm/repositories/LocationRepository';
import { CompanyRepository } from 'src/modules/companies/infra/typeorm/repositories/CompanyRepository';
import { CreateLocationDTO } from '../dtos/create-location.dto';

@Injectable()
export class CreateLocationService {
  constructor(
    @Inject(LocationRepository)
    private readonly locationRepository: LocationRepository,

    @Inject(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(location: CreateLocationDTO) {
    const company = await this.companyRepository.findById(location.company_id);

    if (!company) {
      throw new BadRequestException('Company not found');
    }

    const locationExists = await this.locationRepository.findByName(
      location.name,
    );

    if (locationExists) {
      throw new BadRequestException('Location already exists');
    }

    const newLocation = {
      ...location,
      company,
    };

    const createdLocation = await this.locationRepository.save(newLocation);

    return createdLocation;
  }
}
