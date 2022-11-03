import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaidTicket } from '../entities/paid_ticket.entity';

@Injectable()
export class PaidTicketRepository extends Repository<PaidTicket> {
  constructor(private readonly dataSource: DataSource) {
    super(PaidTicket, dataSource.createEntityManager());
  }
  async getById(id: number): Promise<PaidTicket> {
    const entity = await this.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(` not found`);
    }
    return entity;
  }
}
