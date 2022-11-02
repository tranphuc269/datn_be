import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OvertimeTicket } from './overtime_ticket.entity';
import { PaidTicket } from './paid_ticket.entity';
import { SupplementTicket } from './supplement_ticket.entity';

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
  
  @OneToMany(() => OvertimeTicket, (p) => p.ticketStatus)
  overtimeTickets: OvertimeTicket[];
  
  @OneToMany(() => SupplementTicket, (p) => p.ticketStatus)
  supplementTickets: SupplementTicket[];
}
