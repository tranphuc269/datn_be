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
import { TimeKeeping } from './time_keeping.entity';

@Entity('work_amount')
export class WorkAmount {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' }) id: number;
  @Column({ name: 'name_work_amount', type: 'nvarchar', length: 255 })
  nameWorkAmount: string;
  @Column({ name: 'work_amount', type: 'double' })
  workAmount: number;
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
  @OneToMany(() => TimeKeeping, (b) => b.workAmount)
  @JoinColumn({
    name: '',
  })
  timeKeeping: TimeKeeping[];
}
