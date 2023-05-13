import { IsEmail, IsString } from 'class-validator';

export class CreateLoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
