import { Controller, Get } from '@nestjs/common';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
import { TestInitOrdersService } from 'src/orders/test-init-orders.service';
import { TestInitGoodsService } from './../goods/test-init-goods.service';
import { InitTestDataService } from './init-test-data/init-test-data.service';

@Controller('api/test')
export class TestController {
  constructor(
    private initTestDataService: InitTestDataService,
    private testInitGoodsService: TestInitGoodsService,
    private testInitOrdersService: TestInitOrdersService,
  ) {}

  // http://127.0.0.1:3001/api/test/regenerate-test-data
  @Get('regenerate-test-data')
  async init(): Promise<StatusMessageDto> {
    await this.initTestDataService.initData();
    await this.testInitGoodsService.goodsGenerator();
    await this.testInitOrdersService.clearTables();
    return { ok: true, source: 'regenerate-test-data', message: 'Done' };
  }
}
