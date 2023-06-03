import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Request,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CreateCompanyDTO } from 'src/modules/companies/dtos/create-company.dto';
import { UpdateCompanyDTO } from 'src/modules/companies/dtos/update-company.dto';
import { CreateCompanyService } from 'src/modules/companies/services/create-company.service';
import { DeleteCompanyService } from 'src/modules/companies/services/delete-company.service';
import { GetCompanyPerUserService } from 'src/modules/companies/services/get-company-per-user.service';
import { ListCompanyService } from 'src/modules/companies/services/list-companys.service';
import { ShowCompanyService } from 'src/modules/companies/services/show-company.service';
import { UpdateCompanyService } from 'src/modules/companies/services/update-company.service';
import { PaginationDTO } from 'src/shared/dtos/pagination.dto';

@Controller('companies')
export class CompanyController {
  constructor(
    @Inject(CreateCompanyService)
    private readonly createCompanyService: CreateCompanyService,

    @Inject(UpdateCompanyService)
    private readonly updateCompanyService: UpdateCompanyService,

    @Inject(DeleteCompanyService)
    private readonly deleteCompanyService: DeleteCompanyService,

    @Inject(ListCompanyService)
    private readonly listCompanyService: ListCompanyService,

    @Inject(ShowCompanyService)
    private readonly showCompanyService: ShowCompanyService,

    @Inject(GetCompanyPerUserService)
    private readonly getCompanyPerUserService: GetCompanyPerUserService,
  ) {}

  @Get()
  async list(@Query() query: PaginationDTO) {
    const { page, limit } = query;

    if (page === '0' || limit === '0') {
      throw new BadRequestException('Page and limit must be greater than 0');
    }

    const companies = await this.listCompanyService.execute(
      Number(page),
      Number(limit),
    );

    return companies;
  }

  @Get('user/:user_id')
  async listByUser(
    @Query() query: PaginationDTO,
    @Param('user_id') user_id: number,
  ) {
    const { page, limit } = query;

    if (page === '0' || limit === '0') {
      throw new BadRequestException('Page and limit must be greater than 0');
    }

    const companies = await this.getCompanyPerUserService.execute(
      Number(page),
      Number(limit),
      Number(user_id),
    );

    return companies;
  }

  @Get(':company_id')
  async show(@Param('company_id') company_id: number) {
    const company = await this.showCompanyService.execute(company_id);

    return company;
  }

  @Post('create')
  async create(@Body() company: CreateCompanyDTO, @Request() req: any) {
    const user_id = req.user.id;

    const newCompany = await this.createCompanyService.execute(
      user_id,
      company,
    );

    return newCompany;
  }

  @Put('update/:company_id')
  async update(
    @Body() company: UpdateCompanyDTO,
    @Param('company_id') company_id: number,
  ) {
    const companyUpdated = await this.updateCompanyService.execute(
      company_id,
      company,
    );

    return companyUpdated;
  }

  @Delete('delete/:company_id')
  async delete(@Param('company_id') company_id: number) {
    const companyDeleted = await this.deleteCompanyService.execute(company_id);

    return companyDeleted;
  }
}
