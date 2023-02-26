import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseApiResponse } from 'src/shared/dtos/base-api-response.dto';
import { JwtAuthenticationGuard } from 'src/user/strategies/jwt-authentication.guard';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context';
import { CreatePaidTicketInput } from '../dtos/create-paid-input.dto';
import { PaidTicketOutput } from '../dtos/create-paid-output.dto';
import { GetPaidTicketOutput } from '../dtos/get-paid-output.dto';
import { PaidUpdateInput } from '../dtos/update-paid-input.dto';
import { PaidTicketService } from '../services/paid_ticket.service';
@Controller('paid_tickets')
@ApiTags('paid_tickets')
@ApiBearerAuth()
export class PaidTicketController {
  constructor(private readonly paidTicketService: PaidTicketService) {}

  @Get('hello')
  async helloWorld(): Promise<string> {
    return 'hello';
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('new-paid-ticket')
  @HttpCode(HttpStatus.CREATED)
  async createPaidTicket(
    @ReqContext() ctx: RequestContext,
    @Body() input: CreatePaidTicketInput
  ): Promise<BaseApiResponse<PaidTicketOutput>> {
    const data = await this.paidTicketService.createPaidTicket(ctx, input);
    return { data, meta: {} };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTicket(
    @ReqContext() ctx: RequestContext,
    @Body() input: PaidUpdateInput,
    @Param('id') id: number
  ): Promise<BaseApiResponse<PaidTicketOutput>> {
    const data = await this.paidTicketService.updatePaidTicket(ctx, input, id);
    return { data };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('approve-ticket/:id')
  @HttpCode(HttpStatus.OK)
  async approveTicket(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number
  ): Promise<BaseApiResponse<PaidTicketOutput>> {
    const data = await this.paidTicketService.approveTickets(ctx, id);
    if (data) {
      return { data };
    } else {
      throw new BadRequestException();
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put('denied-ticket/:id')
  @HttpCode(HttpStatus.OK)
  async deniedTicket(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number
  ): Promise<BaseApiResponse<PaidTicketOutput>> {
    const data = await this.paidTicketService.deniedTicket(
      ctx,
      { ticketStatusId: 3 },
      id
    );
    if (data) {
      return { data };
    } else {
      throw new BadRequestException();
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('my-paid/:id')
  async getAllMyPaidTicket(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number
  ): Promise<BaseApiResponse<PaidTicketOutput[]>> {
    const data = await this.paidTicketService.getAllPaidTicket(ctx, userId);
    return { data };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('paid-type')
  async getPaidTicketType(@ReqContext() ctx: RequestContext) {
    const data = await this.paidTicketService.getPaidTicketType(ctx);
    return { data };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('paid-status/:status_id/:id')
  async getMyPaidTicketByStatus(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number,
    @Param('status_id') statusId: number
  ): Promise<BaseApiResponse<PaidTicketOutput[]>> {
    const data = await this.paidTicketService.getPaidTicketByStatus(
      ctx,
      userId,
      statusId
    );
    return { data };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('paid-ticket/:id')
  async getPaidTicketById(
    @ReqContext() ctx: RequestContext,
    @Param('id') paidId: number
  ): Promise<BaseApiResponse<GetPaidTicketOutput>> {
    const data = await this.paidTicketService.getPaidTicketById(ctx, paidId);
    return { data };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('paid-ticket-related/:id')
  async getPaidTicketRelatedMe(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number
  ): Promise<BaseApiResponse<PaidTicketOutput[]>> {
    const data = await this.paidTicketService.getPaidTicketRelatedMe(
      ctx,
      userId
    );
    return { data };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('month-paid/:id/:month')
  async getRecordByMonthAndUserId(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number,
    @Param('month') month: string
  ): Promise<BaseApiResponse<PaidTicketOutput[]>> {
    const data = await this.paidTicketService.getPaidTicketByMonth(
      ctx,
      userId,
      month
    );
    return { data };
  }
}
