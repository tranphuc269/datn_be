import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTimeKeepingDto } from '../dtos/createTimeKeeping.dto';
import { TimeKeepingService } from '../services/time_keeping.service';
@Controller('users')
@ApiTags('users')
export class TimeKeepingController {
  constructor(private readonly timeKeepingService: TimeKeepingService) {}

  @Get('hello')
  async helloWorld(): Promise<string> {
    return 'hello';
  }
  @Post('create_record')
  async createRecord(@Body() createTimeKeepingRecord: CreateTimeKeepingDto) {
    return this.timeKeepingService.createTimeKeepingRecord(createTimeKeepingRecord)
  }
}

