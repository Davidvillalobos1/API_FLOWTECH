import { Test, TestingModule } from '@nestjs/testing';
import { EstadoServicioController } from './estado_servicio.controller';
import { EstadoServicioService } from './estado_servicio.service';

describe('EstadoServicioController', () => {
  let controller: EstadoServicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoServicioController],
      providers: [EstadoServicioService],
    }).compile();

    controller = module.get<EstadoServicioController>(EstadoServicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
