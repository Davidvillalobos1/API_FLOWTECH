import { Test, TestingModule } from '@nestjs/testing';
import { NuestrosTrabajosController } from './nuestros_trabajos.controller';
import { NuestrosTrabajosService } from './nuestros_trabajos.service';

describe('NuestrosTrabajosController', () => {
  let controller: NuestrosTrabajosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NuestrosTrabajosController],
      providers: [NuestrosTrabajosService],
    }).compile();

    controller = module.get<NuestrosTrabajosController>(NuestrosTrabajosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
