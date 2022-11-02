import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity('paid_amounts')
export class PaidAmount {
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
    name: 'amount',
    type: 'double',
  })
  amount: number;

  @OneToOne(() => User, (p) => p.paidAmount)
  user: User;
}
