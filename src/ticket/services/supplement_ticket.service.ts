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
import { TimeKeepingUpdateInput } from 'src/time_keeping/dtos/update-timekeeping-input.dto';
import { StatusUpdateInput } from '../dtos/status-ticket-input.dto';
import { UserService } from 'src/user/services/user.service.spec';
import { MailInput } from 'src/user/dtos/mail.dto';
import { MailService } from 'src/user/services/mail.service';
import * as moment from 'moment';
@Injectable()
export class SupplementTicketService {
  constructor(
    private readonly timeKeepingService: TimeKeepingService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
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
      const user = await this.userService.getById(
        paidTicketDto.approverPersonId
      );

      if (user.role !== 3) {
        return null;
      }
      const saveTicket = await this.supplementTicketRepository.save(
        newSupplementTicket
      );
      return {
        ...plainToInstance(SupplementTicketOutput, saveTicket, {
          excludeExtraneousValues: true,
        }),
        id: saveTicket.id,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
  async getSupplementTicketById(ctx: RequestContext, id: number) {
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
    if (input.ticketStatusId === 1) {
      let newRecordTimeKeeping = new TimeKeepingInput();
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
  async getAllSupplementTicketRelatedMe(ctx: RequestContext, userId: number) {
    try {
      const mySupplementTickets = await this.supplementTicketRepository.findBy({
        approverPersonId: userId,
        ticketStatusId: 1,
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
  async approveTicket(
    ctx: RequestContext,
    rawInput: UpdateSupplementInput,
    id: number
  ): Promise<SupplementTicketOutput> {
    const dbTicket = await this.supplementTicketRepository.findOneBy({ id });
    const user = await this.userService.getById(dbTicket.approverPersonId);
    const createUser = await this.userService.getById(dbTicket.createPersonId);

    if (user.role !== 3) {
      return null;
    }
    const input = plainToInstance(CreateSupplementTicketInput, rawInput, {
      excludeExtraneousValues: true,
    });
    const error = await validate(input, { skipUndefinedProperties: true });
    if (error.length) {
      throw new BadRequestException(error);
    }
    const paid = this.supplementTicketRepository.merge(dbTicket, input);
    const savedPaid = await this.supplementTicketRepository.save(paid);
    const timekeepingRecord =
      await this.timeKeepingService.getRecordByDateAndUserId(
        ctx,
        dbTicket.createPersonId,
        dbTicket.startTime.toISOString().substr(0, 10)
      );

    const startMinutes =
      (dbTicket.startTime.getHours() * 60 + dbTicket.startTime.getMinutes()) /
      60;
    const endMinutes =
      (dbTicket.endTime.getHours() * 60 + dbTicket.endTime.getMinutes()) / 60;
    let morningAmount = 0;
    let afternoonAmount = 0;
    let payloadTicket = new TimeKeepingUpdateInput();
    if (endMinutes < 12) {
      morningAmount = 0.5;
      payloadTicket.morningJoin = dbTicket.startTime;
      payloadTicket.morningLeave = dbTicket.endTime;
    }
    if (startMinutes >= 12) {
      afternoonAmount = 0.5;
      payloadTicket.afternoonJoin = dbTicket.startTime;
      payloadTicket.afternoonLeave = dbTicket.endTime;
    }
    if (startMinutes <= 12 && endMinutes >= 13.5) {
      morningAmount = 0.5;
      afternoonAmount = 0.5;
      payloadTicket.morningJoin = dbTicket.startTime;
      payloadTicket.afternoonLeave = dbTicket.endTime;
    }
    payloadTicket.workAmountId = morningAmount + afternoonAmount;
    payloadTicket.workTypeId = 3;
    payloadTicket.id = timekeepingRecord.id;
    const updateRecordTimeKeeping =
      await this.timeKeepingService.updateRecordTimeKeeping(ctx, payloadTicket);
    let mailInformation = new MailInput();
    mailInformation.email = createUser.email;
    mailInformation.subject = 'Missing Ticket';
    mailInformation.message = `Your Missing ticket is Approved. This is your ticket: ${process.env.URL_FE}missing_work/${dbTicket.id}`;
    await this.mailService.sendMail(mailInformation);
    return plainToInstance(SupplementTicketOutput, savedPaid, {
      excludeExtraneousValues: true,
    });
  }
  async updateSupplementTicketStatus(
    ctx: RequestContext,
    status: StatusUpdateInput,
    id: number
  ): Promise<SupplementTicketOutput> {
    const dbTicket = await this.supplementTicketRepository.findOneBy({ id });

    const input = plainToInstance(CreateSupplementTicketInput, status, {
      excludeExtraneousValues: true,
    });
    const paid = this.supplementTicketRepository.merge(dbTicket, input);
    const savedPaid = await this.supplementTicketRepository.save(paid);

    return plainToInstance(SupplementTicketOutput, savedPaid, {
      excludeExtraneousValues: true,
    });
  }
  async deniedTicket(
    ctx: RequestContext,
    status: StatusUpdateInput,
    id: number
  ): Promise<SupplementTicketOutput> {
    const dbTicket = await this.supplementTicketRepository.findOneBy({ id });

    const user = await this.userService.getById(dbTicket.approverPersonId);
    const createUser = await this.userService.getById(dbTicket.createPersonId);
    if (user.role !== 3) {
      return null;
    }

    const input = plainToInstance(CreateSupplementTicketInput, status, {
      excludeExtraneousValues: true,
    });
    const paid = this.supplementTicketRepository.merge(dbTicket, input);
    const savedPaid = await this.supplementTicketRepository.save(paid);
    let mailInformation = new MailInput();
    mailInformation.email = createUser.email;
    mailInformation.subject = 'Missing Ticket';
    mailInformation.message = `Your Missing ticket is Denied. This is your ticket: ${process.env.URL_FE}missing_work/${dbTicket.id}`;
    return plainToInstance(SupplementTicketOutput, savedPaid, {
      excludeExtraneousValues: true,
    });
  }

  async getMissingTicketByMonth(
    ctx: RequestContext,
    userId: number,
    month: string
  ) {
    let date = new Date(month + '-01');
    let startDate = moment(date).startOf('month').format('YYYY-MM-DD');
    let endDate = moment(date).endOf('month').format('YYYY-MM-DD');
    const listRecord = await this.supplementTicketRepository
      .createQueryBuilder('supplement_tickets')
      .where('supplement_tickets.create_person_id =:userId', {
        userId: userId,
      })
      .andWhere(
        'CAST(supplement_tickets.created_at as DATE) between :startDate and :endDate',
        {
          startDate: startDate,
          endDate: endDate,
        }
      )
      .getMany();
    return listRecord;
  }
}
