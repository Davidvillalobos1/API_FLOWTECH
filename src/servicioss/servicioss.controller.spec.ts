import { Test, TestingModule } from '@nestjs/testing';
import { ServiciossController } from './servicioss.controller';

describe('ServiciossController', () => {
  let controller: ServiciossController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiciossController],
    }).compile();

    controller = module.get<ServiciossController>(ServiciossController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
