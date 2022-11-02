import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaidTicketService } from '../services/paid_ticket.service';
@Controller('paid_tickets')
@ApiTags('paid_tickets')
export class PaidTicketController {
  constructor(private readonly paidTicketService: PaidTicketService) {}

  @Get('hello')
  async helloWorld(): Promise<string> {
    return 'hello';
  }
}

