import { Test, TestingModule } from '@nestjs/testing';
import { MapsApiKeyController } from './maps-api-key.controller';

describe('MapsApiKeyController', () => {
  let controller: MapsApiKeyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapsApiKeyController],
    }).compile();

    controller = module.get<MapsApiKeyController>(MapsApiKeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
