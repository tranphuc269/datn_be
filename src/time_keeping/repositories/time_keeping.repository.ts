import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TimeKeeping } from '../entities/time_keeping.entity';

@Injectable()
export class TimeKeepingRepository extends Repository<TimeKeeping> {
  async getByIdAndDate(
    userId: number,
    checkInDate: string
  ): Promise<TimeKeeping> {
    const qb = this.createQueryBuilder('time_keepings')
      .where('time_keepings.user_id =:userId', {
        userId,
      })
      .andWhere('CAST(time_keepings.create_date as DATE) =:checkInDate', {
        checkInDate,
      });
    return;
  }
}
