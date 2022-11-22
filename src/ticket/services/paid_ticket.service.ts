import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { PaidTicketOutput } from '../dtos/create-paid-output.dto';
import { CreatePaidTicketInput } from '../dtos/create-paid-input.dto';
import { PaidTicket } from '../entities/paid_ticket.entity';
import { PaidTicketRepository } from '../repositories/paid_ticket.repository';
import { RequestContext } from '../../shared/request-context/request-context';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { DetailErrorCode } from 'src/shared/constant/error-code';
import { ErrCategoryCode, ErrDetailCode } from 'src/shared/constant/errors';
@Injectable()
export class PaidTicketService {
  constructor(
    @InjectRepository(PaidTicket)
    private readonly paidTicketRepository: PaidTicketRepository
  ) {}
  async createPaidTicket(
    ctx: RequestContext,
    paidTicketDto: CreatePaidTicketInput
  ) {
    try {
      const newPaidTicket = plainToInstance(PaidTicket, {
        ...paidTicketDto,
      });
      const saveTicket = this.paidTicketRepository.save(newPaidTicket);
      return plainToInstance(PaidTicketOutput, saveTicket, {
        excludeExtraneousValues: true,
      });
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
  // async updatePaidTicket(id: number, paidUpdateData: any) {
  //   let currentPaidTicket = this.getPaidTicketById(id);
  //   if (currentPaidTicket) {
  //     const brand = this.paidTicketRepository.merge(
  //       await currentPaidTicket,
  //       paidUpdateData
  //     );
  //     return currentPaidTicket;
  //   }
  // }
  async updatePaidTicket(
    ctx: RequestContext,
    rawInput: any,
    id: number
  ): Promise<PaidTicketOutput> {
    const dbTicket = await this.paidTicketRepository.findOneBy({ id });

    const input = plainToInstance(CreatePaidTicketInput, rawInput, {
      excludeExtraneousValues: true,
    });
    const error = await validate(input, { skipUndefinedProperties: true });
    if (error.length) {
      throw new BadRequestException(error);
    }

    const brand = this.paidTicketRepository.merge(dbTicket, input);
    const savedBrand = await this.paidTicketRepository.save(brand);

    return plainToInstance(CreatePaidTicketInput, savedBrand, {
      excludeExtraneousValues: true,
    });
  }
}
