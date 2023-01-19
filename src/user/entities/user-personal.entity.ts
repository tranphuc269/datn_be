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
    nullable: true,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'nvarchar',
    length: 50,
    charset: 'utf8',
    nullable: true,
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
    nullable: true,
  })
  identificationIdObj: string;

  @Column({
    name: 'identification_id_date',
    type: 'datetime',
    nullable: true,
  })
  identificationIdDate: Date;

  @Column({
    name: 'place_identification_ID',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
    nullable: true,
  })
  placeID: string;

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
    nullable: true,
  })
  gender: number;

  @Column({
    name: 'national_id',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
    nullable: true,
  })
  nationalId: string;

  @Column({
    name: 'religion_id',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
    nullable: true,
  })
  religionId: string;

  @Column({
    name: 'ethnicity_id',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
    nullable: true,
  })
  ethnicityId: string;

  @Column({
    name: 'marital_status_id',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
    nullable: true,
  })
  maritalStatusId: string;

  @OneToOne(() => User, (p) => p.userPersonalInfo)
  user: User;
}
