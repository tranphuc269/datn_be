import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkAmount } from './work_amount.entity';
import { WorkType } from './work_type.entity';
import { TimeKeeping } from './time_keeping.entity';

@Entity('time_keeping_lists')
export class TimeKeepingList {
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
    name: 'month',
    type: 'datetime',
    nullable: true,
  })
  month: Date;

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

  @ManyToOne(() => User, (b) => b.timeKeepingsList)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @OneToMany(() => TimeKeeping, (b) => b.timekeepingListId)
  timeKeeping: TimeKeeping[];
}
