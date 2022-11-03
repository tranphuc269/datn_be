import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePaidTicketDto } from '../dtos/create-paid.dto';
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
  async createPaidTicket(@Body() input: CreatePaidTicketDto) {
    return this.paidTicketService.createPaidTicket(input);
  }

  @Post('update-paid')
  async updatePaidTicket(@Body() id: number, input: CreatePaidTicketDto) {
    return this.paidTicketService.updatePaidTicket(id, input);
  }
}
