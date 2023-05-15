import { IsString } from 'class-validator';

export class PaginationDTO {
  @IsString()
  page: string;

  @IsString()
  limit: string;
}
