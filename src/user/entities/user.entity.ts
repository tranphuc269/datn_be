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
import { AccountStatus } from './account-status.entity';
import { TimeKeepingList } from '../../time_keeping/entities/time_keeping-list.entity';

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

  @Column({
    name: 'user_personal',
    type: 'int',
    nullable: true,
  })
  userPersonal: number;

  @Column({
    name: 'user_work',
    type: 'int',
    nullable: true,
  })
  userWork: number;

  @Column({
    name: 'contact_user',
    type: 'int',
    nullable: true,
  })
  contactUser: number;

  @Column({
    name: 'is_login',
    type: 'int',
    nullable: true,
  })
  isLogin: number;

  @Column({
    name: 'is_delete',
    type: 'int',
    nullable: true,
  })
  isDelete: number;

  @Column({
    name: 'access_token',
    type: 'nvarchar',
    length: 255,
    charset: 'utf8',
    nullable: true,
  })
  accessToken: string;

  @Column({
    name: 'reset_key',
    type: 'nvarchar',
    length: 255,
    charset: 'utf8',
    nullable: true,
  })
  resetKey: string;

  @Column({
    name: 'expired_key',
    type: 'datetime',
    nullable: true,
  })
  expiredKey: Date;

  @CreateDateColumn({
    name: 'created_at',
    nullable: true,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
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

  @OneToMany(() => TimeKeepingList, (p) => p.user)
  timeKeepingsList: TimeKeepingList[];

  @OneToMany(() => OvertimeTicket, (p) => p.createPerson)
  overtimeTicketsCreate: OvertimeTicket[];

  @OneToOne(() => PaidAmount, (p) => p.user, { cascade: true })
  @JoinColumn({
    name: 'paid_amount',
  })
  paidAmount: PaidAmount;

  @OneToOne(() => UserPersonal, (p) => p.user, { cascade: true })
  @JoinColumn({
    name: 'user_personal',
  })
  userPersonalInfo: UserPersonal;

  @OneToOne(() => UserWork, (p) => p.user, { cascade: true })
  @JoinColumn({
    name: 'user_work',
  })
  userWorkInfo: UserWork;

  @OneToOne(() => ContactUser, (p) => p.user, { cascade: true })
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
  @ManyToOne(() => AccountStatus, (b) => b.users)
  @JoinColumn({
    name: 'account_status',
  })
  accountStatusId: AccountStatus;
}
