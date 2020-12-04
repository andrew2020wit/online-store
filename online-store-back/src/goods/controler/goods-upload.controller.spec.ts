import { Test, TestingModule } from '@nestjs/testing';
import { GoodsUploadController } from './goods-upload.controller';

describe('Goods Controller', () => {
  let controller: GoodsUploadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodsUploadController],
    }).compile();

    controller = module.get<GoodsUploadController>(GoodsUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
