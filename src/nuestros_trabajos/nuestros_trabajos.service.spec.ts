import { Test, TestingModule } from '@nestjs/testing';
import { NuestrosTrabajosService } from './nuestros_trabajos.service';

describe('NuestrosTrabajosService', () => {
  let service: NuestrosTrabajosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NuestrosTrabajosService],
    }).compile();

    service = module.get<NuestrosTrabajosService>(NuestrosTrabajosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
