import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entity/employee.entity';
import { WinstonLogger } from '../logger/logger.service';  // Importe o WinstonLogger

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly logger: WinstonLogger,  // Injete o WinstonLogger
  ) {
    logger.setContext('EmployeeController');  // Defina o contexto para o controlador
  }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      const createdEmployee = await this.employeeService.create(createEmployeeDto);
      this.logger.info(`Employee ${createdEmployee.name} created with ID: ${createdEmployee.id}`);
      return createdEmployee;
    } catch (error) {
      this.logger.error(`Error creating employee: ${error.message}`);
      throw new HttpException('Error creating employee', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get()
  async findAll(): Promise<Employee[]> {
    try {
      return await this.employeeService.findAll();
    } catch (error) {
      this.logger.error(`Error fetching employees: ${error.message}`);
      throw new HttpException('Error fetching employees', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

