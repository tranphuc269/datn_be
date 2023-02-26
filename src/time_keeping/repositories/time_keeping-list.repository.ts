import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TimeKeeping } from '../entities/time_keeping.entity';
import { TimeKeepingList } from '../entities/time_keeping-list.entity';

@Injectable()
export class TimeKeepingListRepository extends Repository<TimeKeepingList> {}
