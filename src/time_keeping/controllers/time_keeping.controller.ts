import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseApiResponse } from 'src/shared/dtos/base-api-response.dto';
import { ReqContext } from 'src/shared/request-context/req-context.decorator';
import { RequestContext } from 'src/shared/request-context/request-context';
import { JwtAuthenticationGuard } from 'src/user/strategies/jwt-authentication.guard';
import { TimeKeepingInput } from '../dtos/timekeeping-input.dto';
import { TimeKeepingOutput } from '../dtos/timekeeping-output.dto';
import { TimeKeepingUpdateInput } from '../dtos/update-timekeeping-input.dto';
import { TimeKeepingService } from '../services/time_keeping.service';
@Controller('time_keepings')
@ApiTags('time_keepings')
@ApiBearerAuth()
export class TimeKeepingController {
  constructor(private readonly timeKeepingService: TimeKeepingService) {}

  @Get('hello')
  async helloWorld(): Promise<string> {
    return 'hello';
  }

  @UseGuards(JwtAuthenticationGuard)
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

  @UseGuards(JwtAuthenticationGuard)
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

  @UseGuards(JwtAuthenticationGuard)
  @Get('month-timekeeping/:id/:month')
  async getRecordByMonthAndUserId(
    @ReqContext() ctx: RequestContext,
    @Param('id') timekeepingListId: number,
    @Param('month') month: string
  ): Promise<BaseApiResponse<TimeKeepingOutput[]>> {
    const data = await this.timeKeepingService.getRecordByMonthAndListId(
      ctx,
      timekeepingListId,
      month
    );
    return { data };
  }
  // async getRecordByMonthAndUserId(
  //   @ReqContext() ctx: RequestContext,
  //   @Param('id') userId: number,
  //   @Param('month') month: string
  // ): Promise<BaseApiResponse<TimeKeepingOutput[]>> {
  //   const data = await this.timeKeepingService.getRecordByMonthAndUserId(
  //     ctx,
  //     userId,
  //     month
  //   );
  //   return { data };
  // }

  @UseGuards(JwtAuthenticationGuard)
  @Get('month-timekeeping/:id')
  async getRecordByThisMonthAndUserId(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number
  ): Promise<BaseApiResponse<TimeKeepingOutput[]>> {
    const data = await this.timeKeepingService.getRecordByThisMonthAndUserId(
      ctx,
      userId
    );
    return { data };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('total-month-working/:id')
  async getTotalWorkingThisMonth(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number
  ) {
    const data = await this.timeKeepingService.getTotalWorkingThisMonth(
      ctx,
      userId
    );
    return { data };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('new-record-in-month/:id')
  async createRecordInMonth(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number
  ) {
    return this.timeKeepingService.createRecordInMonth(ctx, userId);
  }
}
