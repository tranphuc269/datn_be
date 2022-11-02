import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PaidTicket } from '../entities/paid_ticket.entity';

@Injectable()
export class PaidTicketRepository extends Repository<PaidTicket> {}
