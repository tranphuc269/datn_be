import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaidTicketOutput } from '../dtos/create-paid-output.dto';
import { CreatePaidTicketInput } from '../dtos/create-paid-input.dto';
import { PaidTicket } from '../entities/paid_ticket.entity';
import { PaidTicketRepository } from '../repositories/paid_ticket.repository';
import { RequestContext } from '../../shared/request-context/request-context';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { TimeKeepingService } from '../../time_keeping/services/time_keeping.service';
import { PaidUpdateInput } from '../dtos/update-paid-input.dto';
import { StatusUpdateInput } from '../dtos/status-ticket-input.dto';
import { PaidTypeService } from './paidtype.service';
import * as moment from 'moment';
import { TimeKeepingUpdateInput } from 'src/time_keeping/dtos/update-timekeeping-input.dto';
import { UserService } from '../../user/services/user.service.spec';
@Injectable()
export class PaidTicketService {
  constructor(
    private readonly timeKeepingService: TimeKeepingService,
    private readonly paidTypeService: PaidTypeService,
    private readonly userService: UserService,
    @InjectRepository(PaidTicket)
    private readonly paidTicketRepository: PaidTicketRepository
  ) {}
  async createPaidTicket(
    ctx: RequestContext,
    paidTicketDto: CreatePaidTicketInput
  ) {
    try {
      const user = await this.userService.getById(
        paidTicketDto.approverPersonId
      );

      if (user.role !== 3) {
        return;
      }
      const newPaidTicket = plainToInstance(PaidTicket, {
        ...paidTicketDto,
      });
      const saveTicket = await this.paidTicketRepository.save(newPaidTicket);
      return plainToInstance(PaidTicketOutput, saveTicket, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
  async getPaidTicketById(ctx: RequestContext, id: number) {
    try {
      const paidTicket = await this.paidTicketRepository.findOneBy({ id });
      return paidTicket;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
  async updatePaidTicket(
    ctx: RequestContext,
    rawInput: PaidUpdateInput,
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
    const paid = this.paidTicketRepository.merge(dbTicket, input);
    const savedPaid = await this.paidTicketRepository.save(paid);

    return plainToInstance(PaidTicketOutput, savedPaid, {
      excludeExtraneousValues: true,
    });
  }

  async updatePaidTicketStatus(
    ctx: RequestContext,
    status: StatusUpdateInput,
    id: number
  ): Promise<PaidTicketOutput> {
    const dbTicket = await this.paidTicketRepository.findOneBy({ id });

    const input = plainToInstance(CreatePaidTicketInput, status, {
      excludeExtraneousValues: true,
    });
    const paid = this.paidTicketRepository.merge(dbTicket, input);
    const savedPaid = await this.paidTicketRepository.save(paid);

    return plainToInstance(PaidTicketOutput, savedPaid, {
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
  async getPaidTicketRelatedMe(ctx: RequestContext, userId: number) {
    try {
      const myPaidTickets = await this.paidTicketRepository.findBy({
        approverPersonId: userId,
        ticketStatusId: 1,
      });
      return myPaidTickets;
    } catch (error) {
      console.log(error);
    }
  }
  async getPaidTicketType(ctx: RequestContext) {
    try {
      const listPaidType = await this.paidTypeService.getAllPaidTicket(ctx);
      return listPaidType;
    } catch (error) {}
  }
  async approveTicket(
    ctx: RequestContext,
    rawInput: PaidUpdateInput,
    id: number
  ): Promise<PaidTicketOutput> {
    const dbTicket = await this.paidTicketRepository.findOneBy({ id });

    const user = await this.userService.getById(dbTicket.approverPersonId);

    if (user.role !== 3) {
      return;
    }

    const input = plainToInstance(CreatePaidTicketInput, rawInput, {
      excludeExtraneousValues: true,
    });
    const error = await validate(input, { skipUndefinedProperties: true });
    if (error.length) {
      throw new BadRequestException(error);
    }
    const paid = this.paidTicketRepository.merge(dbTicket, input);
    const savedPaid = await this.paidTicketRepository.save(paid);
    const timekeepingRecord =
      await this.timeKeepingService.getRecordByDateAndUserId(
        ctx,
        dbTicket.createPersonId,
        dbTicket.startTime.toString().substr(0, 10)
      );
    const noonTime = new Date(timekeepingRecord.createDate.setHours(12));
    const morningTime = new Date(timekeepingRecord.createDate.setHours(8));
    const afternoonTime = new Date(
      timekeepingRecord.createDate.setHours(13, 30)
    );
    const eveningTime = new Date(timekeepingRecord.createDate.setHours(17, 30));
    let currentStartTime = moment(input.startTime).format('HH');
    let currentEndTime = moment(input.endTime).format('HH');

    let morningAmount = 0;
    let afternoonAmount = 0;
    if (parseFloat(currentStartTime) < 12 && parseFloat(currentEndTime) < 12) {
      morningAmount = moment
        .duration(
          moment(input.endTime ? input.endTime : noonTime).diff(
            input.endTime ? input.endTime : morningTime
          )
        )
        .asHours();
    } else if (
      parseFloat(currentStartTime) < 12 &&
      parseFloat(currentEndTime) > 13.5
    ) {
      morningAmount = moment
        .duration(
          moment(noonTime).diff(input.startTime ? input.startTime : morningTime)
        )
        .asHours();
      afternoonAmount = moment
        .duration(
          moment(input.endTime ? input.endTime : eveningTime).diff(
            afternoonTime
          )
        )
        .asHours();
    } else if (
      parseFloat(currentStartTime) < 12 &&
      parseFloat(currentEndTime) < 13.5
    ) {
      morningAmount = moment
        .duration(
          moment(noonTime).diff(input.startTime ? input.startTime : morningTime)
        )
        .asHours();
    } else if (parseFloat(currentStartTime) > 13.5) {
      afternoonAmount = moment
        .duration(
          moment(input.endTime ? input.endTime : eveningTime).diff(
            input.startTime ? input.startTime : afternoonTime
          )
        )
        .asHours();
    }
    let payloadTicket = new TimeKeepingUpdateInput();
    payloadTicket.id = timekeepingRecord.id;
    payloadTicket.afternoonJoin = timekeepingRecord.afternoonJoin;
    payloadTicket.afternoonLeave = timekeepingRecord.afternoonLeave;
    payloadTicket.userId = timekeepingRecord.userId;
    payloadTicket.morningJoin = timekeepingRecord.morningJoin;
    payloadTicket.morningLeave = timekeepingRecord.morningLeave;
    payloadTicket.workAmountId =
      morningAmount + afternoonAmount > 8
        ? 1
        : (morningAmount + afternoonAmount) / 8;
    const updateRecordTimeKeeping =
      await this.timeKeepingService.updateRecordTimeKeeping(ctx, payloadTicket);
    return plainToInstance(PaidTicketOutput, savedPaid, {
      excludeExtraneousValues: true,
    });
  }
  async approveTickets(
    ctx: RequestContext,
    id: number
  ): Promise<PaidTicketOutput> {
    const dbTicket = await this.paidTicketRepository.findOneBy({ id });
    const user = await this.userService.getById(dbTicket.approverPersonId);

    if (user.role !== 3) {
      return;
    }
    const input = plainToInstance(
      CreatePaidTicketInput,
      { ticketStatusId: 2 },
      {
        excludeExtraneousValues: true,
      }
    );
    const error = await validate(input, { skipUndefinedProperties: true });
    if (error.length) {
      throw new BadRequestException(error);
    }
    const paid = this.paidTicketRepository.merge(dbTicket, input);
    const savedPaid = await this.paidTicketRepository.save(paid);
    const timekeepingRecord =
      await this.timeKeepingService.getRecordByDateAndUserId(
        ctx,
        dbTicket.createPersonId,
        dbTicket.startTime.toISOString().substr(0, 10)
      );
    const morningTime = new Date(timekeepingRecord.createDate.setHours(8));
    const eveningTime = new Date(timekeepingRecord.createDate.setHours(17, 30));
    let payloadTicket = new TimeKeepingUpdateInput();
    payloadTicket.id = timekeepingRecord.id;
    payloadTicket.afternoonLeave = eveningTime;
    payloadTicket.userId = timekeepingRecord.userId;
    payloadTicket.morningJoin = morningTime;
    payloadTicket.workAmountId = 1;
    payloadTicket.workTypeId = 2;
    const updateRecordTimeKeeping =
      await this.timeKeepingService.updateRecordTimeKeeping(ctx, payloadTicket);
    return plainToInstance(PaidTicketOutput, savedPaid, {
      excludeExtraneousValues: true,
    });
  }
  async deniedTicket(
    ctx: RequestContext,
    rawInput: PaidUpdateInput,
    id: number
  ): Promise<PaidTicketOutput> {
    const dbTicket = await this.paidTicketRepository.findOneBy({ id });
    const user = await this.userService.getById(dbTicket.approverPersonId);

    if (user.role !== 3) {
      return;
    }
    return await this.updatePaidTicket(ctx, rawInput, id);
  }
}
