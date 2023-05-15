import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILocationRepository } from '../../../domain/repositories/ILocationRepository';
import { Repository } from 'typeorm';
import { Location } from '../entities/Location';
import { ICreateLocation } from 'src/modules/locations/domain/models/ICreateLocation';
import { LocationPaginated } from 'src/modules/locations/interfaces';

@Injectable()
export class LocationRepository implements ILocationRepository {
  constructor(
    @InjectRepository(Location)
    private readonly locationsRepository: Repository<Location>,
  ) {}

  async findById(id: number): Promise<Location | undefined> {
    const location = await this.locationsRepository.findOne({
      where: { id },
      relations: ['company'],
    });

    if (!location) {
      return undefined;
    }

    return location;
  }

  async findByName(name: string): Promise<Location | undefined> {
    const location = await this.locationsRepository.findOne({
      where: { name },
    });

    if (!location) {
      return undefined;
    }

    return location;
  }

  async findByCep(cep: string): Promise<Location | undefined> {
    const location = await this.locationsRepository.findOne({
      where: { cep },
    });

    if (!location) {
      return undefined;
    }

    return location;
  }

  async findByCompany(company_id: number) {
    const locations = await this.locationsRepository.find({
      where: {
        company: {
          id: company_id,
        },
      },
    });

    return locations;
  }

  async save(location: ICreateLocation): Promise<Location> {
    const newLocation = await this.locationsRepository.save(location);

    return newLocation;
  }

  async delete(id: number) {
    await this.locationsRepository.delete(id);
  }

  async list(): Promise<Location[]> {
    const locations = await this.locationsRepository.find({
      relations: ['company'],
    });

    return locations;
  }

  async listPaginated(page: number, limit: number): Promise<LocationPaginated> {
    const skip = (page - 1) * limit;

    const [location, count] = await this.locationsRepository.findAndCount({
      relations: ['company'],
      skip,
      take: limit,
    });

    const next_page = limit * page < count ? page + 1 : null;
    const before_page = page !== 1 ? page - 1 : null;

    return {
      data: location as Location[],
      meta: {
        total: count,
        page,
        last_page: before_page,
        next_page,
      },
    };
  }

  async listPaginatedByCompany(
    page: number,
    limit: number,
    companyId: number,
  ): Promise<LocationPaginated> {
    const skip = (page - 1) * limit;

    const [location, count] = await this.locationsRepository.findAndCount({
      relations: ['company'],
      where: {
        company: {
          id: companyId,
        },
      },
      skip,
      take: limit,
    });

    const next_page = limit * page < count ? page + 1 : null;
    const before_page = page !== 1 ? page - 1 : null;

    return {
      data: location as Location[],
      meta: {
        total: count,
        page,
        last_page: before_page,
        next_page,
      },
    };
  }
}
