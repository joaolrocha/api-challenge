import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let mockEmployeeRepo: Partial<jest.Mocked<Repository<Employee>>>;

  beforeEach(async () => {
    mockEmployeeRepo = {
      find: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockEmployeeRepo,
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      mockEmployeeRepo.find.mockResolvedValue([new Employee()]);
      const employees = await service.findAll();
      expect(employees).toEqual([new Employee()]);
    });
  });

  describe('create', () => {
    it('should successfully create a new employee', async () => {
      const createEmployeeDto = {
        name: 'John Doe',
        email: 'john@example.com',  // adicione todos os campos faltantes
        cpf: '123.456.789-00',
        phone: '123-456-7890',
        skills: ['NodeJS', 'TypeScript'],
        status: 'VALID',
        validationDate: new Date(),
      };
      const mockEmployee = {
        id: 1,  // um ID falso, já que é gerado automaticamente
        ...createEmployeeDto
      };
      mockEmployeeRepo.save.mockResolvedValue(mockEmployee);
      const result = await service.create(createEmployeeDto);
      expect(result).toEqual(mockEmployee);
    });
  });

  describe('findEmployeeById', () => {
    it('should retrieve an employee by ID', async () => {
      const employee = new Employee();
      employee.id = 1;
      mockEmployeeRepo.findOne.mockResolvedValue(employee);
      const result = await service.findEmployeeById(1);
      expect(result).toEqual(employee);
    });
  });
});

