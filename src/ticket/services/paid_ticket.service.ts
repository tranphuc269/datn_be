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
import { TimeKeepingService } from '../../time_keeping/services/time_keeping.service';
import { TimeKeepingInput } from 'src/time_keeping/dtos/timekeeping-input.dto';
import { UpdatePaidInput } from '../dtos/update-paid-input.dto';
@Injectable()
export class PaidTicketService {
  constructor(
    private readonly timeKeepingService: TimeKeepingService,
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
  async updatePaidTicket(
    ctx: RequestContext,
    rawInput: UpdatePaidInput,
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
    if (input.ticketStatusId === 2) {
      let newRecordTimeKeeping = new TimeKeepingInput();
      newRecordTimeKeeping.userId = rawInput.createPersonId;
      newRecordTimeKeeping.workAmountId = 3;
      newRecordTimeKeeping.workTypeId = 3;
      newRecordTimeKeeping.createDate = new Date();
      this.timeKeepingService.createRecordTimeKeeping(
        ctx,
        newRecordTimeKeeping
      );
    }
    const savedBrand = await this.paidTicketRepository.save(brand);

    return plainToInstance(CreatePaidTicketInput, savedBrand, {
      excludeExtraneousValues: true,
    });
  }
  async getAllPaidTicket(ctx: RequestContext, userId: number) {
    try {
      const myPaidTickets = await this.paidTicketRepository.findBy({
        createPersonId: userId,
      });
      return myPaidTickets;
    } catch (error) {
      console.log(error);
    }
  }
  async getPaidTicketByStatus(
    ctx: RequestContext,
    userId: number,
    statusId: number
  ) {
    try {
      const myPaidTickets = await this.paidTicketRepository
        .createQueryBuilder('paid_tickets')
        .where('paid_tickets.create_person_id =:userId', {
          userId,
        })
        .andWhere('paid_tickets.ticket_status_id =:statusId', {
          statusId,
        });
      return myPaidTickets.getMany();
    } catch (error) {
      console.log(error);
    }
  }
}
