import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('account_request')
export class Account {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'create_person_id',
    type: 'int',
  })
  createPersonId: number;

  @Column({
    name: 'system_admin_id',
    type: 'int',
  })
  systemAdminId: number;

  @Column({
    name: 'type',
    type: 'int',
    nullable: true,
  })
  type: number;
  
  @Column({
    name: 'target_id',
    type: 'int',
    nullable: true,
  })
  targetId: number;

  @Column({
    name: 'new_member_mail',
    type: 'nvarchar',
    length: 255,
    charset: 'utf8',
    nullable: true,
  })
  newMemberEmail: string;

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
    name: 'is_deleted',
    type: 'tinyint',
  })
  isDeleted: boolean = false;

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
}
