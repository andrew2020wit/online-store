import { Controller, Get } from '@nestjs/common';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
import { InitTestDataService } from './init-test-data/init-test-data.service';

@Controller('api/test')
export class TestController {
  constructor(private initTestDataService: InitTestDataService) {}

  //http://127.0.0.1:3001/api/test/regenerate-test-data
  @Get('regenerate-test-data')
  async init(): Promise<StatusMessageDto> {
    return await this.initTestDataService.initData();
  }
}
