import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TimeKeeping } from '../entities/time_keeping.entity';

@Injectable()
export class TimeKeepingRepository extends Repository<TimeKeeping> {}
