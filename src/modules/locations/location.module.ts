import { Delete, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationRepository } from './infra/typeorm/repositories/LocationRepository';
import { Location } from './infra/typeorm/entities/Location';
import { CreateLocationService } from './services/create-location.service';
import { CompanyModule } from '../companies/company.module';
import { LocationController } from './infra/http/controllers/location.controller';
import { ListLocationService } from './services/list-location.service';
import { ShowLocationService } from './services/show-location.service';
import { DeleteLocationService } from './services/delete-location.service';
import { UpdateLocationService } from './services/update-location.service';
import { ListLocationByCompanyService } from './services/list-location-by-company.service';

@Module({
  imports: [CompanyModule, TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [
    LocationRepository,
    CreateLocationService,
    ListLocationService,
    ShowLocationService,
    DeleteLocationService,
    UpdateLocationService,
    ListLocationByCompanyService,
  ],
})
export class LocationModule {}
