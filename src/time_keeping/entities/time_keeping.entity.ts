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

@Entity('time_keeping')
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
  })
  morningJoin: Date;
  @Column({
    name: 'morning_left',
    type: 'datetime',
  })
  morningLeft: Date;
  @Column({
    name: 'afternoon_join',
    type: 'datetime',
  })
  afternoonJoin: Date;
  @Column({
    name: 'afternoon_left',
    type: 'datetime',
  })
  afternoonLeft: Date;
  @Column({
    name: 'odd_time',
    type: 'int',
  })
  oddTime: number;
  @Column({
    name: 'work_amount_id',
    type: 'int',
  })
  workAmountId: number;
  @Column({
    name: 'work_type_id',
    type: 'int',
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

  @ManyToOne(() => User, (b) => b.timeKeeping)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(() => WorkAmount, (b) => b.timeKeeping)
  @JoinColumn({ name: 'work_amount_id' })
  workAmount: WorkAmount;
  
  @ManyToOne(() => WorkType, (b) => b.timeKeeping)
  @JoinColumn({ name: 'work_type_id' })
  workType: WorkType;
}
