import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TimeKeepingService } from '../services/time_keeping.service';
@Controller('time_keepings')
@ApiTags('time_keepings')
export class TimeKeepingController {
  constructor(private readonly timeKeepingService: TimeKeepingService) {}

  @Get('hello')
  async helloWorld(): Promise<string> {
    return 'hello';
  }
}

