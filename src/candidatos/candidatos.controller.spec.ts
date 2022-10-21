import { Test, TestingModule } from '@nestjs/testing';
import { CandidatosController } from './candidatos.controller';
import { CandidatosService } from './candidatos.service';

describe('CandidatosController', () => {
  let controller: CandidatosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatosController],
      providers: [CandidatosService],
    }).compile();

    controller = module.get<CandidatosController>(CandidatosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
