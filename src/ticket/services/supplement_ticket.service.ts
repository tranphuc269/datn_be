import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestContext } from '../../shared/request-context/request-context';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { TimeKeepingService } from '../../time_keeping/services/time_keeping.service';
import { TimeKeepingInput } from 'src/time_keeping/dtos/timekeeping-input.dto';
import { SupplementTicketRepository } from '../repositories/supplement_ticket.repository';
import { SupplementTicket } from '../entities/supplement_ticket.entity';
import { CreateSupplementTicketInput } from '../dtos/create-supplement-input.dto';
import { SupplementTicketOutput } from '../dtos/create-supplement-output.dto';
import { UpdateSupplementInput } from '../dtos/update-supplement-input.dto';
@Injectable()
export class SupplementTicketService {
  constructor(
    private readonly timeKeepingService: TimeKeepingService,
    @InjectRepository(SupplementTicket)
    private readonly supplementTicketRepository: SupplementTicketRepository
  ) {}
  async createSupplementTicket(
    ctx: RequestContext,
    paidTicketDto: CreateSupplementTicketInput
  ) {
    try {
      const newSupplementTicket = plainToInstance(SupplementTicket, {
        ...paidTicketDto,
      });
      const saveTicket = this.supplementTicketRepository.save(newSupplementTicket);
      return plainToInstance(SupplementTicketOutput, saveTicket, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
  async getSupplementTicketById(id: number) {
    try {
      const paidTicket = this.supplementTicketRepository.findOneBy({ id });
      return paidTicket;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
  async updateSupplementTicket(
    ctx: RequestContext,
    rawInput: UpdateSupplementInput,
    id: number
  ): Promise<SupplementTicketOutput> {
    const dbTicket = await this.supplementTicketRepository.findOneBy({ id });

    const input = plainToInstance(CreateSupplementTicketInput, rawInput, {
      excludeExtraneousValues: true,
    });
    const error = await validate(input, { skipUndefinedProperties: true });
    if (error.length) {
      throw new BadRequestException(error);
    }

    const brand = this.supplementTicketRepository.merge(dbTicket, input);
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
    const savedBrand = await this.supplementTicketRepository.save(brand);

    return plainToInstance(CreateSupplementTicketInput, savedBrand, {
      excludeExtraneousValues: true,
    });
  }
  async getAllSupplementTicket(ctx: RequestContext, userId: number) {
    try {
      const mySupplementTickets = await this.supplementTicketRepository.findBy({
        createPersonId: userId,
      });
      return mySupplementTickets;
    } catch (error) {
      console.log(error);
    }
  }
  async getSupplementTicketByStatus(
    ctx: RequestContext,
    userId: number,
    statusId: number
  ) {
    try {
      const mySupplementTickets = await this.supplementTicketRepository
        .createQueryBuilder('paid_tickets')
        .where('paid_tickets.create_person_id =:userId', {
          userId,
        })
        .andWhere('paid_tickets.ticket_status_id =:statusId', {
          statusId,
        });
      return mySupplementTickets.getMany();
    } catch (error) {
      console.log(error);
    }
  }
}
