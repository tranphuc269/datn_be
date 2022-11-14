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

@Entity('user_personals')
export class UserPersonal {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

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
    name: 'gender',
    type: 'tinyint',
  })
  gender: number;

  @Column({
    name: 'national_id',
    type: 'int',
  })
  nationalId: number;

  @Column({
    name: 'religion_id',
    type: 'int',
    nullable: true,
  })
  religionId: number;

  @Column({
    name: 'ethnicity_id',
    type: 'int',
    nullable: true,
  })
  ethnicityId: number;

  @Column({
    name: 'marital_status_id',
    type: 'int',
    nullable: true,
  })
  maritalStatusId: number;

  @OneToOne(() => User, (p) => p.userPersonalInfo)
  user: User;
}
