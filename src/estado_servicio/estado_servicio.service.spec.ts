import { Test, TestingModule } from '@nestjs/testing';
import { EstadoServicioService } from './estado_servicio.service';

describe('EstadoServicioService', () => {
  let service: EstadoServicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoServicioService],
    }).compile();

    service = module.get<EstadoServicioService>(EstadoServicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
