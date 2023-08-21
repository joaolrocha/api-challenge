import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entity/employee.entity';
import { utcToZonedTime, format } from 'date-fns-tz';

@Injectable()
export class EmployeeService {
  // Injetando o repositório do TypeORM para a entidade Employee
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) { }

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
    return await this.employeeRepository.find({
      order: {
        name:'ASC'
      }
    });
  }

  async findEmployeeById(id: number): Promise<Employee> {
    return await this.employeeRepository.findOne({ where: { id: id } });
  }

  async updateStatus(id: number, status: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id: id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`)
    }
    employee.status = status

    if (status === 'Validado') {
      const brasiliaTz = 'America/Sao_Paulo';
      const zonedDate = utcToZonedTime(new Date(), brasiliaTz);
      employee.validationDate = zonedDate;
    }

    return await this.employeeRepository.save(employee)
  }
}
