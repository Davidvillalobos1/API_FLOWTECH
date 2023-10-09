import { Test, TestingModule } from '@nestjs/testing';
import { ServicioAgendadoService } from './servicio_agendado.service';

describe('ServicioAgendadoService', () => {
  let service: ServicioAgendadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicioAgendadoService],
    }).compile();

    service = module.get<ServicioAgendadoService>(ServicioAgendadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
