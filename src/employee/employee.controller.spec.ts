import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Repository } from 'typeorm';
import { Employee } from './entity/employee.entity';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  // Mocks
  const mockLogger: any = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  };

  const mockEmployeeRepo: any = {
    find: jest.fn(),
    save: jest.fn(),
    // ... outros métodos que você precisa mockar.
  };

  const mockEmployeeService: any = {
    create: jest.fn(),
    // ... Adicione outros métodos conforme necessário.
  };

  // Executado antes de cada teste
  beforeEach(() => {
    service = new EmployeeService(mockEmployeeRepo /*, outras dependências conforme o constructor do seu service*/);
    controller = new EmployeeController(service, mockLogger);
  });

  // Teste para o método 'create' do controller
  describe('create', () => {
    it('should create and return an employee', async () => {
      const createEmployeeDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '123.456.789-00',
        skills: ['NodeJS', 'TypeScript'],
        status: 'VALID',
        // ... outros campos conforme definidos no DTO.
      };

      mockEmployeeService.create.mockResolvedValue(createEmployeeDto);
      
      expect(await controller.create(createEmployeeDto)).toEqual(createEmployeeDto);
      expect(mockLogger.log).toHaveBeenCalledWith('Employee created with success');
    });
  });

  // Aqui você pode continuar adicionando mais testes para outros métodos do controller.
});

