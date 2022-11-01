import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TimeKeeping } from './time_keeping.entity';

@Entity('work_types')
export class WorkType {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' }) id: number;

  @Column({ name: 'name_work_amount', type: 'nvarchar', length: 255 })
  nameWorkType: string;

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
  @OneToMany(() => TimeKeeping, (b) => b.workType)
  timeKeepings: TimeKeeping[];
}
