import { IsString, IsNumber } from 'class-validator';

export class CreateLocationDTO {
  @IsString()
  name: string;

  @IsString()
  cep: string;

  @IsString()
  street: string;

  @IsNumber()
  number: number;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsNumber()
  company_id: number;
}
