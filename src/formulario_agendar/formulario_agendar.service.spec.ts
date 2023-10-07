import { Test, TestingModule } from '@nestjs/testing';
import { FormularioAgendarService } from './formulario_agendar.service';

describe('FormularioAgendarService', () => {
  let service: FormularioAgendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormularioAgendarService],
    }).compile();

    service = module.get<FormularioAgendarService>(FormularioAgendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
