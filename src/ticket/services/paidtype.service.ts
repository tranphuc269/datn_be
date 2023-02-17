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
import { PaidUpdateInput } from '../dtos/update-paid-input.dto';
import { StatusUpdateInput } from '../dtos/status-ticket-input.dto';
import { PaidType } from '../entities/paid_type.entity';
import { PaidTypeRepository } from '../repositories/paid_type.repository';
@Injectable()
export class PaidTypeService {
  constructor(
    @InjectRepository(PaidType)
    private readonly paidTypeRepository: PaidTypeRepository
  ) {}
  async getAllPaidTicket(ctx: RequestContext) {
    try {
      const myPaidTickets = await this.paidTypeRepository.find();
      return myPaidTickets;
    } catch (error) {
      console.log(error);
    }
  }
}
