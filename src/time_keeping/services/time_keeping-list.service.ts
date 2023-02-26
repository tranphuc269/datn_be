import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { RequestContext } from 'src/shared/request-context/request-context';
import { Repository } from 'typeorm';
import { TimeKeepingInput } from '../dtos/timekeeping-input.dto';
import { TimeKeepingOutput } from '../dtos/timekeeping-output.dto';
import { TimeKeepingUpdateInput } from '../dtos/update-timekeeping-input.dto';
import { TimeKeeping } from '../entities/time_keeping.entity';
import { TimeKeepingRepository } from '../repositories/time_keeping.repository';
import * as moment from 'moment';
import { TimeKeepingList } from '../entities/time_keeping-list.entity';
import { TimeKeepingListInput } from '../dtos/timekeeping-list-input.dto';
import { TimeKeepingListRepository } from '../repositories/time_keeping-list.repository';
import { TimeKeepingService } from './time_keeping.service';
import { TimeKeepingListOutput } from '../dtos/timekeeping-list-output.dto';
@Injectable()
export class TimeKeepingListService {
  constructor(
    @InjectRepository(TimeKeepingList)
    private readonly timeKeepingListRepository: TimeKeepingListRepository,
    private readonly timeKeepingService: TimeKeepingService
  ) {}

  async createTimekeepingList(
    ctx: RequestContext,
    input: TimeKeepingListInput,
    userId: number
  ): Promise<TimeKeepingOutput> {
    let dateNow = new Date();
    const existRecord = await this.timeKeepingListRepository
      .createQueryBuilder('time_keeping_lists')
      .where('time_keeping_lists.user_id =:userId', {
        userId: userId,
      })
      .andWhere('CAST(time_keeping_lists.created_at as DATE) =:dateNow', {
        dateNow: dateNow.toISOString().split('T')[0],
      })
      .getMany();
    console.log(existRecord);
    if (existRecord.length > 0) {
      return;
    }
    const newRecord = this.timeKeepingListRepository.create(input);
    const saveRecord = await this.timeKeepingListRepository.save(newRecord);
    const recordTimeKeeping =
      await this.timeKeepingService.getRecordByMonthAndListId(
        ctx,
        newRecord.id,
        new Date(input.month).toISOString()
      );
    if (recordTimeKeeping.length > 0) {
      return;
    }
    await this.timeKeepingService.createRecordInMonth(ctx, newRecord.id);
    return plainToInstance(TimeKeepingOutput, saveRecord, {
      excludeExtraneousValues: true,
    });
  }

  async getTimeKeepingListByMonthAndUserId(
    ctx: RequestContext,
    userId: number,
    month: string
  ): Promise<TimeKeepingListOutput> {
    try {
      let date = new Date(month + '-01');
      let startDate = moment(date).startOf('month').format('YYYY-MM-DD');
      let endDate = moment(date).endOf('month').format('YYYY-MM-DD');
      const listRecord = await this.timeKeepingListRepository
        .createQueryBuilder('time_keeping_lists')
        .where('time_keeping_lists.user_id =:userId', {
          userId: userId,
        })
        .andWhere(
          'CAST(time_keeping_lists.month as DATE) between :startDate and :endDate',
          {
            startDate: startDate,
            endDate: endDate,
          }
        )
        .getOne();
      return listRecord;
    } catch (error) {}
  }
}
