import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaidTicket } from './paid_ticket.entity';

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
    nullable: true
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
    nullable: true
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
}

