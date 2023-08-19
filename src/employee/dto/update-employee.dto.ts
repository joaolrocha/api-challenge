import { IsArray, IsEmail, IsNotEmpty, IsOptional, Length, Max, Min } from "class-validator";

export class UpdateEmployeeDto {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 100)
  email?: string;
  
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
