import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Account } from '../entities/account.entity';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(private readonly dataSource: DataSource) {
    super(Account, dataSource.createEntityManager());
  }
  // async getById(id: number): Promise<PaidTicket> {
  //   const entity = await this.findOneBy({ id });
  //   if (!entity) {
  //     throw new NotFoundException(` not found`);
  //   }
  //   return entity;
  // }
}
