import { Test, TestingModule } from '@nestjs/testing';
import { FormularioAgendarController } from './formulario_agendar.controller';

describe('FormularioAgendarController', () => {
  let controller: FormularioAgendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormularioAgendarController],
    }).compile();

    controller = module.get<FormularioAgendarController>(
      FormularioAgendarController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
