import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestContext } from '../../shared/request-context/request-context';
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
      throw new BadRequestException(error);
    }
  }
}
