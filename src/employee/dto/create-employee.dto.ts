import { IsEmail, IsNotEmpty, Length, IsOptional, IsArray, Min, Max } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsNotEmpty()
  @Length(11, 14)
  cpf: string;

  @IsOptional()
  phone?: string;

  @IsArray()
  @Min(1)
  @Max(3)
  skills: string[];
}
