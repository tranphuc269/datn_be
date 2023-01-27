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
import { CreateSupplementTicketInput } from '../dtos/create-supplement-input.dto';
import { SupplementTicketOutput } from '../dtos/create-supplement-output.dto';
import { UpdateSupplementInput } from '../dtos/update-supplement-input.dto';
import { SupplementTicketService } from '../services/supplement_ticket.service';
@Controller('supplement_tickets')
@ApiTags('supplement_tickets')
export class SupplementTicketController {
  constructor(
    private readonly supplementTicketService: SupplementTicketService
  ) {}

  @Get('hello')
  async helloWorld(): Promise<string> {
    return 'hello';
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSupplementTicket(
    @ReqContext() ctx: RequestContext,
    @Body() input: CreateSupplementTicketInput
  ): Promise<BaseApiResponse<SupplementTicketOutput>> {
    const data = await this.supplementTicketService.createSupplementTicket(
      ctx,
      input
    );
    return { data, meta: {} };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTicket(
    @ReqContext() ctx: RequestContext,
    @Body() input: UpdateSupplementInput,
    @Param('id') id: number
  ): Promise<BaseApiResponse<SupplementTicketOutput>> {
    const data = await this.supplementTicketService.updateSupplementTicket(
      ctx,
      input,
      id
    );
    return { data };
  }

  @Get('my-supplement/:id')
  async getAllMySupplementTicket(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number
  ): Promise<BaseApiResponse<SupplementTicketOutput[]>> {
    const data = await this.supplementTicketService.getAllSupplementTicket(
      ctx,
      userId
    );
    return { data };
  }

  @Get('supplement-status:status_id:id')
  async getMySupplementTicketByStatus(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number,
    @Param('status_id') statusId: number
  ): Promise<BaseApiResponse<SupplementTicketOutput[]>> {
    const data = await this.supplementTicketService.getSupplementTicketByStatus(
      ctx,
      userId,
      statusId
    );
    return { data };
  }
}
