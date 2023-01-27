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
} from 'typeorm';
import { PaidType } from './paid_type.entity';
import { TicketStatus } from './ticket_status.entity';

@Entity('supplement_tickets')
export class SupplementTicket {
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
    nullable: true
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
    name: 'is_ot',
    type: 'tinyint',
  })
  isOT: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt: Date;
  @Column({
    name: 'approve_date',
    type: 'datetime',
    nullable: true
  })
  approveDate: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'datetime',
    nullable: true,
  })
  deletedAt?: Date;

  @ManyToOne(() => User, (b) => b.supplementTickets)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(() => TicketStatus, (b) => b.supplementTickets)
  @JoinColumn({
    name: 'ticket_status_id',
  })
  ticketStatus: TicketStatus;
}
