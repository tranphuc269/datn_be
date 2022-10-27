import { BaseEntity } from 'src/shared/entities/base.entity';
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

@Entity('user')
export class User implements BaseEntity {
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
    name: 'status_account',
    type: 'int',
  })
  status_account: number;
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
  first_name: string;
  @Column({
    name: 'last_name',
    type: 'nvarchar',
    length: 50,
    charset: 'utf8',
  })
  last_name: string;
  @Column({
    name: 'birthday',
    type: 'datetime',
  })
  birthday: Date;
  @Column({
    name: 'identification_id_obj',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
  })
  identification_id_obj: string;
  @Column({
    name: 'passport_obj',
    type: 'nvarchar',
    length: 20,
    charset: 'utf8',
  })
  passport_obj: string;
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
  phone_number: string;
  @Column({
    name: 'gender',
    type: 'tinyint',
  })
  gender: number;
  @Column({
    name: 'national_id',
    type: 'int',
  })
  national_id: number;
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
  @OneToMany(() => PaidTicket, (p) => p.user_id)
  products: PaidTicket[];
}
