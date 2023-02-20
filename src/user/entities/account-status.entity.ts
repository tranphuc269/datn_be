import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('account_status')
export class AccountStatus {
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

  @OneToMany(() => User, (p) => p.accountStatusId)
  users: User[];
}
