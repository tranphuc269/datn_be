import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SupplementTicket } from '../entities/supplement_ticket.entity';

@Injectable()
export class SupplementTicketRepository extends Repository<SupplementTicket> {
  constructor(private readonly dataSource: DataSource) {
    super(SupplementTicket, dataSource.createEntityManager());
  }
  // async getById(id: number): Promise<PaidTicket> {
  //   const entity = await this.findOneBy({ id });
  //   if (!entity) {
  //     throw new NotFoundException(` not found`);
  //   }
  //   return entity;
  // }
  async getById(id: number): Promise<SupplementTicket> {
    const entity = await this.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(` not found`);
    }
    return entity;
  }
}
