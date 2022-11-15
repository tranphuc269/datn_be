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
import { User } from './user.entity';

@Entity('contact_users')
export class ContactUser {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'city',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
    nullable: true,
  })
  city: string;

  @Column({
    name: 'state',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
    nullable: true,
  })
  state: string;

  @Column({
    name: 'address_1',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
    nullable: true,
  })
  address1: string;

  @Column({
    name: 'address_2',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
    nullable: true,
  })
  address2: string;

  @Column({
    name: 'phone_number',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
    nullable: true,
  })
  phoneNumber: string;


  @Column({
    name: 'country_id',
    type: 'int',
    nullable: true,
  })
  countryId: number;

  @OneToOne(() => User, (p) => p.contactUserInfo)
  user: User;
}
