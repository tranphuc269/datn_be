import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaidTicket } from '../entities/paid_ticket.entity';
import { PaidTicketRepository } from '../repositories/paid_ticket.repository';
@Injectable()
export class PaidTicketService {
  constructor(
    @InjectRepository(PaidTicket)
    private readonly paidTicketRepository: PaidTicketRepository
  ) {}
}
