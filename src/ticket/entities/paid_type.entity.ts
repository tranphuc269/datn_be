import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { PaidTicket } from './paid_ticket.entity';

@Entity('paid_types')
export class PaidType {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'nvarchar',
    length: 50,
  })
  name: string;

  @Column({
    name: 'coefficient_salary',
    type: 'double',
  })
  coefficientSalary: number;

  @OneToMany(() => PaidTicket, (p) => p.paidType)
  paidTickets: PaidTicket[];
}
