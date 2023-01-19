import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseApiResponse } from 'src/shared/dtos/base-api-response.dto';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context';
import { CreatePaidTicketInput } from '../dtos/create-paid-input.dto';
import { PaidTicketOutput } from '../dtos/create-paid-output.dto';
import { PaidStatusUpdateInput } from '../dtos/status-ticket-input.dto';
import { PaidUpdateInput } from '../dtos/update-paid-input.dto';
import { PaidTicketService } from '../services/paid_ticket.service';
@Controller('paid_tickets')
@ApiTags('paid_tickets')
export class PaidTicketController {
  constructor(private readonly paidTicketService: PaidTicketService) {}

  @Get('hello')
  async helloWorld(): Promise<string> {
    return 'hello';
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPaidTicket(
    @ReqContext() ctx: RequestContext,
    @Body() input: CreatePaidTicketInput
  ): Promise<BaseApiResponse<PaidTicketOutput>> {
    const data = await this.paidTicketService.createPaidTicket(ctx, input);
    return { data, meta: {} };
  }

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

  @Put('update/:id')
  @HttpCode(HttpStatus.OK)
  async updateTicketStatus(
    @ReqContext() ctx: RequestContext,
    @Body() status: PaidStatusUpdateInput,
    @Param('id') id: number
  ): Promise<BaseApiResponse<PaidTicketOutput>> {
    console.log(status);
    const data = await this.paidTicketService.updatePaidTicketStatus(
      ctx,
      status,
      id
    );
    return { data };
  }
}
