import { Test, TestingModule } from '@nestjs/testing';
import { ServicioAgendadoController } from './servicio_agendado.controller';

describe('ServicioAgendadoController', () => {
  let controller: ServicioAgendadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicioAgendadoController],
    }).compile();

    controller = module.get<ServicioAgendadoController>(ServicioAgendadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
