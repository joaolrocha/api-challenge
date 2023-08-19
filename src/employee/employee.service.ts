import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './entity/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  // Injetando o repositório do TypeORM para a entidade Employee
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  /**
   * Cria um novo registro de funcionário no banco de dados.
   *
   * @param {CreateEmployeeDto} employeeDto - Dados do funcionário para serem registrados.
   * @returns {Promise<Employee>} - Retorna a entidade Employee criada.
   */
  async create(employeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeDto);
    return await this.employeeRepository.save(employee);
  }
ß
  // Metodo que trás todos os employees
  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }
  
}


