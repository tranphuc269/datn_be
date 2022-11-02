import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PaidTicket } from './paid_ticket.entity';

@Entity('ticket_statuses')
export class TicketStatus {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;
  @Column({
    name: 'status_name',
    type: 'nvarchar',
    length: 50,
  })
  statusName: string;

  @OneToMany(() => PaidTicket, (p) => p.ticketStatus)
  paidTickets: PaidTicket[];
}
