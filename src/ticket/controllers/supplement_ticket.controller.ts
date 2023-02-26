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
import { CreateSupplementTicketInput } from '../dtos/create-supplement-input.dto';
import { SupplementTicketOutput } from '../dtos/create-supplement-output.dto';
import { UpdateSupplementInput } from '../dtos/update-supplement-input.dto';
import { SupplementTicketService } from '../services/supplement_ticket.service';
@Controller('supplement_tickets')
@ApiTags('supplement_tickets')
@ApiBearerAuth()
export class SupplementTicketController {
  constructor(
    private readonly supplementTicketService: SupplementTicketService
  ) {}

  @Get('hello')
  async helloWorld(): Promise<string> {
    return 'hello';
  }

  @UseGuards(JwtAuthenticationGuard)
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

  @UseGuards(JwtAuthenticationGuard)
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

  @UseGuards(JwtAuthenticationGuard)
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

  @UseGuards(JwtAuthenticationGuard)
  @Get('my-supplement-related/:id')
  async getAllSupplementTicketRelatedMe(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number
  ): Promise<BaseApiResponse<SupplementTicketOutput[]>> {
    const data =
      await this.supplementTicketService.getAllSupplementTicketRelatedMe(
        ctx,
        userId
      );
    return { data };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('supplement/:id')
  async getSupplementTicketById(
    @ReqContext() ctx: RequestContext,
    @Param('id') idTicket: number
  ): Promise<BaseApiResponse<SupplementTicketOutput>> {
    const data = await this.supplementTicketService.getSupplementTicketById(
      ctx,
      idTicket
    );
    return { data };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('supplement-status/:status_id/:id')
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

  @UseGuards(JwtAuthenticationGuard)
  @Put('approve-ticket/:id')
  @HttpCode(HttpStatus.OK)
  async approveTicket(
    @ReqContext() ctx: RequestContext,
    @Body() input: UpdateSupplementInput,
    @Param('id') id: number
  ): Promise<BaseApiResponse<SupplementTicketOutput>> {
    const data = await this.supplementTicketService.approveTicket(
      ctx,
      input,
      id
    );
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
  ): Promise<BaseApiResponse<SupplementTicketOutput>> {
    const data = await this.supplementTicketService.deniedTicket(
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
  @Get('month-missing/:id/:month')
  async getRecordByMonthAndUserId(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number,
    @Param('month') month: string
  ): Promise<BaseApiResponse<SupplementTicketOutput[]>> {
    const data = await this.supplementTicketService.getMissingTicketByMonth(
      ctx,
      userId,
      month
    );
    return { data };
  }
}
