import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TimeKeeping } from '../../time_keeping/entities/time_keeping.entity';
import { PaidTicket } from '../../ticket/entities/paid_ticket.entity';
import { PaidAmount } from '../../ticket/entities/paid_amount.entity';
import { SupplementTicket } from '../../ticket/entities/supplement_ticket.entity';
import { OvertimeTicket } from '../../ticket/entities/overtime_ticket.entity';
import { UserPersonal } from './user-personal.entity';
import { UserWork } from './user-work.entity';
import { Role } from './role.entity';
import { ContactUser } from './contact-user.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'account_status',
    type: 'int',
  })
  accountStatus: number;

  @Column({
    name: 'role',
    type: 'int',
  })
  role: number;

  @Column({
    name: 'email',
    type: 'nvarchar',
    length: 255,
    charset: 'utf8',
  })
  email: string;

  @Column({
    name: 'password',
    type: 'nvarchar',
    length: 255,
    charset: 'utf8',
  })
  password: string;

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

  @OneToMany(() => PaidTicket, (p) => p.user)
  paidTickets: PaidTicket[];

  @OneToMany(() => SupplementTicket, (p) => p.user)
  supplementTickets: SupplementTicket[];

  @OneToMany(() => TimeKeeping, (p) => p.user)
  timeKeepings: TimeKeeping[];

  @OneToMany(() => OvertimeTicket, (p) => p.createPerson)
  overtimeTicketsCreate: OvertimeTicket[];

  @OneToOne(() => PaidAmount, (p) => p.user)
  @JoinColumn({
    name: 'paid_amount',
  })
  paidAmount: PaidAmount;

  @OneToOne(() => UserPersonal, (p) => p.user)
  @JoinColumn({
    name: 'user_personal',
  })
  userPersonalInfo: UserPersonal;

  @OneToOne(() => UserWork, (p) => p.user)
  @JoinColumn({
    name: 'user_work',
  })
  userWorkInfo: UserWork;

  @OneToOne(() => ContactUser, (p) => p.user)
  @JoinColumn({
    name: 'contact_user',
  })
  contactUserInfo: ContactUser;

  @ManyToMany(() => OvertimeTicket, (p) => p, { cascade: true })
  overtimeTickets: OvertimeTicket[];

  @ManyToOne(() => Role, (b) => b.users)
  @JoinColumn({
    name: 'role',
  })
  roleId: Role;
}
