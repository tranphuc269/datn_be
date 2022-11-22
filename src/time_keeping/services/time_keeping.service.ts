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
@Injectable()
export class TimeKeepingService {
  constructor(
    @InjectRepository(TimeKeeping)
    private readonly timeKeepingRepository: TimeKeepingRepository
  ) {}

  async createRecordTimeKeeping(
    ctx: RequestContext,
    input: TimeKeepingInput
  ): Promise<TimeKeepingOutput> {
    let dateNow = new Date();
    const existRecord = await this.timeKeepingRepository
      .createQueryBuilder('time_keepings')
      .where('time_keepings.user_id =:userId', {
        userId: input.userId,
      })
      .andWhere('CAST(time_keepings.create_date as DATE) =:dateNow', {
        dateNow: dateNow.toISOString().split('T')[0],
      })
      .getMany();
    if (existRecord.length > 0) {
      let updateData = new TimeKeepingUpdateInput();
      updateData.id = existRecord[0].id;
      updateData.userId = input.userId;
      updateData.createDate = input.createDate;
      updateData.morningJoin = input.morningJoin;
      updateData.morningLeave = input.morningLeave;
      updateData.afternoonJoin = input.afternoonJoin;
      updateData.afternoonLeave = input.afternoonLeave;
      updateData.oddTime = input.oddTime;
      updateData.workAmountId = input.workAmountId;
      updateData.workTypeId = input.workTypeId;
      this.updateRecordTimeKeeping(ctx, updateData);
    }
    const newRecord = this.timeKeepingRepository.create(input);
    const saveRecord = await this.timeKeepingRepository.save(newRecord);
    return saveRecord;
  }
  async updateRecordTimeKeeping(
    ctx: RequestContext,
    input: TimeKeepingUpdateInput
  ): Promise<TimeKeepingOutput> {
    const record = await this.timeKeepingRepository.findOneBy({ id: input.id });
    this.timeKeepingRepository.merge(record, input);
    const saveRecord = this.timeKeepingRepository.save(record);
    return plainToInstance(TimeKeepingOutput, saveRecord, {
      exposeDefaultValues: true,
    });
  }
}
