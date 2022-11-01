import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTimeKeepingDto } from '../dtos/createTimeKeeping.dto';
import { TimeKeeping } from '../entities/time_keeping.entity';
import { TimeKeepingRepository } from '../repositories/time_keeping.repository';
@Injectable()
export class TimeKeepingService {
  constructor(
    @InjectRepository(TimeKeeping)
    private readonly timeKeepingRepository: TimeKeepingRepository
  ) {}

  async getAllRecordByUserId(userId: number){
    const listRecord = await this.timeKeepingRepository.find()
  }
  async createTimeKeepingRecord(recordData: CreateTimeKeepingDto) {
    try {
      const newRecord = this.timeKeepingRepository.create(recordData);
      await this.timeKeepingRepository.save(newRecord);
      return newRecord;
    } catch (error) {
      console.log(error);
    }
  }
}
