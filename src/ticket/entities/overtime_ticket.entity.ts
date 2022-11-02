import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PaidType } from './paid_type.entity';
import { TicketStatus } from './ticket_status.entity';

@Entity('overtime_tickets')
export class OvertimeTicket {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'create_person_id',
    type: 'int',
  })
  createPersonId: number;

  @Column({
    name: 'related_person_id',
    type: 'int',
  })
  relatedPersonId: number;

  @Column({
    name: 'approver_person_id',
    type: 'int',
  })
  approverPersonId: number;

  @Column({
    name: 'ticket_status_id',
    type: 'int',
  })
  ticketStatusId: number;

  @Column({
    name: 'project_id',
    type: 'int',
  })
  projectId: number;

  @Column({
    name: 'start_time',
    type: 'datetime',
  })
  startTime: Date;

  @Column({
    name: 'end_time',
    type: 'datetime',
  })
  endTime: Date;

  @Column({
    name: 'reason',
    type: 'text',
  })
  reason: string;

  @Column({
    name: 'paid_type_id',
    type: 'int',
  })
  typePaidId: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Date;

  @ManyToOne(() => User, (b) => b.paidTickets)
  @JoinColumn({
    name: 'create_id',
  })
  user: User;

  @ManyToOne(() => PaidType, (b) => b.paidTickets)
  @JoinColumn({
    name: 'paid_type_id',
  })
  paidType: PaidType;

  @ManyToOne(() => TicketStatus, (b) => b.paidTickets)
  @JoinColumn({
    name: 'ticket_status_id',
  })
  ticketStatus: TicketStatus;

  @ManyToMany(() => User, (p) => p.overtimeTickets)
  @JoinTable({
    name: 'ticket_users',
    joinColumn: {
      name: 'ticket_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
