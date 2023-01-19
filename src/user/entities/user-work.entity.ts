import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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
    name: 'bhxh_rate',
    type: 'nvarchar',
    length: 20,
    nullable: true,
  })
  bhxhRate: string;

  @Column({
    name: 'bhyt_date',
    type: 'datetime',
    nullable: true,
  })
  bhytDate: Date;


  @Column({
    name: 'leave_reason',
    type: 'longtext',
    charset: 'utf8',
    nullable: true,
  })
  leaveReason: string;

  @OneToOne(() => User, (p) => p.userWorkInfo)
  user: User;
}
