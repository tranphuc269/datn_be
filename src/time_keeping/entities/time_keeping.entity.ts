import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkAmount } from './work_amount.entity';
import { WorkType } from './work_type.entity';

@Entity('time_keepings')
export class TimeKeeping {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'user_id',
    type: 'int',
  })
  userId: number;

  @Column({
    name: 'create_date',
    type: 'datetime',
  })
  createDate: Date;

  @Column({
    name: 'morning_join',
    type: 'datetime',
    nullable: true,
  })
  morningJoin: Date;

  @Column({
    name: 'morning_leave',
    type: 'datetime',
    nullable: true,
  })
  morningLeave: Date;

  @Column({
    name: 'afternoon_join',
    type: 'datetime',
    nullable: true,
  })
  afternoonJoin: Date;

  @Column({
    name: 'afternoon_leave',
    type: 'datetime',
    nullable: true,
  })
  afternoonLeave: Date;

  @Column({
    name: 'odd_time',
    type: 'int',
    nullable: true,
  })
  oddTime: number;

  @Column({
    name: 'work_amount_id',
    type: 'float',
    nullable: true,
  })
  workAmountId: number;

  @Column({
    name: 'work_type_id',
    type: 'int',
    nullable: true,
  })
  workTypeId: number;

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

  @ManyToOne(() => User, (b) => b.timeKeepings)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(() => WorkType, (b) => b.timeKeepings)
  @JoinColumn({ name: 'work_type_id' })
  workType: WorkType;
}
