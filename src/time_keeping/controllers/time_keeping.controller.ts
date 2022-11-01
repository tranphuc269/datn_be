import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TimeKeepingService } from '../services/time_keeping.service';
@Controller('users')
@ApiTags('users')
export class TimeKeepingController {
  constructor(private readonly timeKeepingService: TimeKeepingService) {}

  @Get('hello')
  async helloWorld(): Promise<string> {
    return 'hello';
  }
}

