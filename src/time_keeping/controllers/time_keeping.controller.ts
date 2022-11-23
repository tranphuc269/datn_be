import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqContext } from 'src/shared/request-context/req-context.decorator';
import { RequestContext } from 'src/shared/request-context/request-context';
import { TimeKeepingInput } from '../dtos/timekeeping-input.dto';
import { TimeKeepingUpdateInput } from '../dtos/update-timekeeping-input.dto';
import { TimeKeepingService } from '../services/time_keeping.service';
@Controller('time_keepings')
@ApiTags('time_keepings')
export class TimeKeepingController {
  constructor(private readonly timeKeepingService: TimeKeepingService) {}

  @Get('hello')
  async helloWorld(): Promise<string> {
    return 'hello';
  }

  @Post('create-timekeeping')
  async createRecordTimeKeeping(
    @ReqContext() ctx: RequestContext,
    @Body() input: TimeKeepingInput
  ) {
    const data = await this.timeKeepingService.createRecordTimeKeeping(
      ctx,
      input
    );
    return { data };
  }

  @Post('update-timekeeping')
  async updateRecordTimeKeeping(
    @ReqContext() ctx: RequestContext,
    @Body() input: TimeKeepingUpdateInput
  ) {
    const data = await this.timeKeepingService.updateRecordTimeKeeping(
      ctx,
      input
    );
    return { data };
  }
}
