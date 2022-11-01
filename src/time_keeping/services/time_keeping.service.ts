import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeKeeping } from '../entities/time_keeping.entity';
import { TimeKeepingRepository } from '../repositories/time_keeping.repository';
@Injectable()
export class TimeKeepingService {
  constructor(
    @InjectRepository(TimeKeeping)
    private readonly timeKeepingRepository: TimeKeepingRepository
  ) {}
}
