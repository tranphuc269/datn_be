import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'nvarchar',
    length: 255,
    charset: 'utf8',
  })
  name: string;

  @Column({
    name: 'account_status',
    type: 'int',
  })
  accountStatus: number;

  @Column({
    name: 'password',
    type: 'nvarchar',
    length: 255,
    charset: 'utf8',
  })
  password: string;

  @Column({
    name: 'first_name',
    type: 'nvarchar',
    length: 50,
    charset: 'utf8',
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'nvarchar',
    length: 50,
    charset: 'utf8',
  })
  lastName: string;

  @Column({
    name: 'birthday',
    type: 'datetime',
    nullable: true,
  })
  birthday: Date;

  @Column({
    name: 'identification_id_obj',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
  })
  identificationIdObj: string;

  @Column({
    name: 'passport_obj',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
    nullable: true,
  })
  passportObj: string;

  @Column({
    name: 'email',
    type: 'nvarchar',
    length: 255,
    charset: 'utf8',
  })
  email: string;

  @Column({
    name: 'phone_number',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
  })
  phoneNumber: string;

  @Column({
    name: 'gender',
    type: 'tinyint',
  })
  gender: number;

  @Column({
    name: 'national_id',
    type: 'int',
  })
  nationalId: number;

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

  @ManyToMany(() => OvertimeTicket, (p) => p, { cascade: true })
  overtimeTickets: OvertimeTicket[];
}
