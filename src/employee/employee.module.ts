import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entity/employee.entity';
import { WinstonLogger } from 'src/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])], // Isto é importante!
  providers: [EmployeeService, WinstonLogger],
  controllers: [EmployeeController],
})
export class EmployeeModule {}

