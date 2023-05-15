import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CreateLocationDTO } from '../../../dtos/create-location.dto';
import { CreateLocationService } from '../../../services/create-location.service';
import { ListLocationService } from 'src/modules/locations/services/list-location.service';
import { ShowLocationService } from 'src/modules/locations/services/show-location.service';
import { DeleteLocationService } from 'src/modules/locations/services/delete-location.service';
import { UpdateLocationService } from 'src/modules/locations/services/update-location.service';
import { UpdateLocationDTO } from 'src/modules/locations/dtos/update-location.dto';
import { PaginationDTO } from 'src/shared/dtos/pagination.dto';
import { ListLocationByCompanyService } from 'src/modules/locations/services/list-location-by-company.service';

@Controller('locations')
export class LocationController {
  constructor(
    @Inject(CreateLocationService)
    private readonly createLocationService: CreateLocationService,

    @Inject(ListLocationService)
    private readonly listLocationService: ListLocationService,

    @Inject(ShowLocationService)
    private readonly showLocationService: ShowLocationService,

    @Inject(DeleteLocationService)
    private readonly deleteLocationService: DeleteLocationService,

    @Inject(UpdateLocationService)
    private readonly updateLocationService: UpdateLocationService,

    @Inject(ListLocationByCompanyService)
    private readonly listLocationByCompanyService: ListLocationByCompanyService,
  ) {}

  @Get()
  async list(@Query() query: PaginationDTO) {
    const { page, limit } = query;

    if (page === '0' || limit === '0') {
      throw new BadRequestException('Page and limit must be greater than 0');
    }

    const locations = await this.listLocationService.execute(
      Number(page),
      Number(limit),
    );

    return locations;
  }

  @Get('/company/:companyId')
  async listByCompany(
    @Query() query: PaginationDTO,
    @Param('companyId') companyId: number,
  ) {
    const { page, limit } = query;

    if (page === '0' || limit === '0') {
      throw new BadRequestException('Page and limit must be greater than 0');
    }

    const locations = await this.listLocationByCompanyService.execute(
      Number(page),
      Number(limit),
      companyId,
    );

    return locations;
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    const location = await this.showLocationService.execute(id);

    return location;
  }

  @Post('/create')
  async create(@Body() location: CreateLocationDTO) {
    const createdLocation = await this.createLocationService.execute(location);

    return createdLocation;
  }

  @Put('/update/:id')
  async update(@Param('id') id: number, @Body() location: UpdateLocationDTO) {
    const updatedLocation = await this.updateLocationService.execute(
      id,
      location,
    );

    return updatedLocation;
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number) {
    await this.deleteLocationService.execute(id);
  }
}
