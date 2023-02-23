import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeKeepingService } from '../../time_keeping/services/time_keeping.service';
import * as moment from 'moment';
import { Account } from '../entities/account.entity';
import { AccountRepository } from '../repositories/account.repository';
import { RequestContext } from 'src/shared/request-context/request-context';
import { CreateAccountTicketInput } from '../dtos/create-account-input.dto';
import { plainToInstance } from 'class-transformer';
import { AccountOutput } from '../dtos/create-account-output.dto';
import { UpdateAccountInput } from '../dtos/update-account-input.dto';
import { validate } from 'class-validator';
import { UserService } from 'src/user/services/user.service.spec';
@Injectable()
export class AccountService {
  constructor(
    private readonly timeKeepingService: TimeKeepingService,
    private readonly userService: UserService,
    @InjectRepository(Account)
    private readonly accountRepository: AccountRepository
  ) {}
  async createAccountRequest(
    ctx: RequestContext,
    accountDto: CreateAccountTicketInput
  ) {
    try {
      const newAccountRequest = plainToInstance(Account, {
        ...accountDto,
      });
      const user = await this.userService.getById(
        newAccountRequest.systemAdminId
      );

      if (user.role !== 4) {
        return;
      }
      const saveTicket = await this.accountRepository.save(newAccountRequest);
      return plainToInstance(AccountOutput, saveTicket, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
  async updateAccountRequest(
    ctx: RequestContext,
    rawInput: UpdateAccountInput,
    id: number
  ): Promise<AccountOutput> {
    const dbTicket = await this.accountRepository.findOneBy({ id });
    const input = plainToInstance(CreateAccountTicketInput, rawInput, {
      excludeExtraneousValues: true,
    });
    const error = await validate(input, { skipUndefinedProperties: true });
    if (error.length) {
      throw new BadRequestException(error);
    }
    const request = this.accountRepository.merge(dbTicket, input);
    const savedRequest = await this.accountRepository.save(request);

    return plainToInstance(AccountOutput, savedRequest, {
      excludeExtraneousValues: true,
    });
  }
  async getAllRequest(ctx: RequestContext, userId: number) {
    try {
      const myPaidTickets = await this.accountRepository.findBy({
        createPersonId: userId,
      });
      return myPaidTickets;
    } catch (error) {
      console.log(error);
    }
  }
  async getRequestRelatedMe(ctx: RequestContext, userId: number) {
    try {
      const myPaidTickets = await this.accountRepository.findBy({
        systemAdminId: userId,
      });
      return myPaidTickets;
    } catch (error) {
      console.log(error);
    }
  }
  async getRequestById(ctx: RequestContext, id: number) {
    try {
      const paidTicket = await this.accountRepository.findOneBy({ id });
      return paidTicket;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }
}
