import { Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { WinstonLogger } from '../logger/logger.service'; // Importe o WinstonLogger
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';

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

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Employee> {
    const employee = await this.employeeService.findEmployeeById(id);
    if (!employee) {
      this.logger.error(`Employee with ID ${id} not found`);
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    this.logger.debug(`Found employee with ID ${id}: ${JSON.stringify(employee)}`);
    return employee;
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ): Promise<Employee> {
    try {
      const updatedEmployee = await this.employeeService.updateStatus(id, status);
      this.logger.info(`Employee with ID: ${id} had their status updated to: ${status}`);
      return updatedEmployee;
    } catch (error) {
      this.logger.error(`Failed to update status for Employee with ID: ${id}. Error: ${error.message}`);
      throw new HttpException('Failed to update employee status', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

