import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseApiResponse } from 'src/shared/dtos/base-api-response.dto';
import { ReqContext } from 'src/shared/request-context/req-context.decorator';
import { RequestContext } from 'src/shared/request-context/request-context';
import { JwtAuthenticationGuard } from 'src/user/strategies/jwt-authentication.guard';
import { TimeKeepingInput } from '../dtos/timekeeping-input.dto';
import { TimeKeepingListInput } from '../dtos/timekeeping-list-input.dto';
import { TimeKeepingOutput } from '../dtos/timekeeping-output.dto';
import { TimeKeepingUpdateInput } from '../dtos/update-timekeeping-input.dto';
import { TimeKeepingListService } from '../services/time_keeping-list.service';
import { TimeKeepingService } from '../services/time_keeping.service';
@Controller('time_keepings')
@ApiTags('time_keepings')
@ApiBearerAuth()
export class TimeKeepingListController {
  constructor(
    private readonly timeKeepingListService: TimeKeepingListService
  ) {}

  @Get('hello')
  async helloWorld(): Promise<string> {
    return 'hello';
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('create-timekeeping-list')
  async createRecordTimeKeeping(
    @ReqContext() ctx: RequestContext,
    @Body() input: TimeKeepingListInput
  ) {
    const data = await this.timeKeepingListService.createTimekeepingList(
      ctx,
      input,
      input.userId
    );
    return { data };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('timekeeping-list/:id/:month')
  async getTimeKeepingListByYearAndUserId(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number,
    @Param('month') month: string
  ) {
    const data =
      await this.timeKeepingListService.getTimeKeepingListByYearAndUserId(
        ctx,
        userId,
        month
      );
    return { data };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('timekeeping-list/:id')
  async getTimeKeepingListById(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number
  ) {
    const data = await this.timeKeepingListService.getTimeKeepingListById(
      ctx,
      userId
    );
    return { data };
  }
}
