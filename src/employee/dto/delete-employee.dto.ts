import { IsNotEmpty } from "class-validator";

export class DeleteEmployeeDto {
  @IsNotEmpty()
  id: number;
}