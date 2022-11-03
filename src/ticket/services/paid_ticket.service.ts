import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaidTicketOutput } from '../dtos/create-output.dto';
import { CreatePaidTicketDto } from '../dtos/create-paid.dto';
import { PaidTicket } from '../entities/paid_ticket.entity';
import { PaidTicketRepository } from '../repositories/paid_ticket.repository';
@Injectable()
export class PaidTicketService {
  constructor(
    @InjectRepository(PaidTicket)
    private readonly paidTicketRepository: PaidTicketRepository
  ) {}
  async createPaidTicket(paidTicketDto: CreatePaidTicketDto) {
    try {
      const newPaidTicket = this.paidTicketRepository.create(paidTicketDto);
      await this.paidTicketRepository.save(newPaidTicket);
      return newPaidTicket;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
  async getPaidTicketById(id: number) {
    try {
      const paidTicket = this.paidTicketRepository.findOneBy({ id });
      return paidTicket;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
  async updatePaidTicket(id: number, paidUpdateData: CreatePaidTicketDto) {
    let currentPaidTicket = this.getPaidTicketById(id);
    if (currentPaidTicket) {
      console.log(currentPaidTicket);
    }
  }
}
