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

@Entity('user_works')
export class UserWork {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'workEmail',
    type: 'nvarchar',
    length: 255,
    charset: 'utf8',
    nullable: true,
  })
  workEmail: string;
  
  @Column({
    name: 'tax_number',
    type: 'nvarchar',
    length: 255,
    charset: 'utf8',
    nullable: true,
  })
  taxNumber: string;
  
  @Column({
    name: 'health_insurance_number',
    type: 'nvarchar',
    length: 255,
    charset: 'utf8',
    nullable: true,
  })
  healthInsuranceNumber: string;
  
  @Column({
    name: 'health_insurance_place',
    type: 'nvarchar',
    length: 255,
    charset: 'utf8',
    nullable: true,
  })
  healthInsurancePlace: string;


  @Column({
    name: 'join_date',
    type: 'datetime',
  })
  joinDate: Date;

  @Column({
    name: 'end_date',
    type: 'datetime',
    nullable: true,
  })
  endDate: Date;

  @Column({
    name: 'bhxh_date',
    type: 'datetime',
    nullable: true,
  })
  bhxhDate: Date;

  @Column({
    name: 'bhyt_date',
    type: 'datetime',
    nullable: true,
  })
  bhytDate: Date;

  @Column({
    name: 'identification_id_obj',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
    nullable: true,
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

  @OneToOne(() => User, (p) => p.userWorkInfo)
  user: User;
}
