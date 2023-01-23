import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaidType } from '../entities/paid_type.entity';

@Injectable()
export class PaidTypeRepository extends Repository<PaidType> {
  constructor(private readonly dataSource: DataSource) {
    super(PaidType, dataSource.createEntityManager());
  }
  // async getById(id: number): Promise<PaidTicket> {
  //   const entity = await this.findOneBy({ id });
  //   if (!entity) {
  //     throw new NotFoundException(` not found`);
  //   }
  //   return entity;
  // }
}
