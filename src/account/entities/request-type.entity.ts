import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity('request_types')
export class RequestType {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;
  @Column({
    name: 'name',
    type: 'nvarchar',
    length: 50,
  })
  statusName: string;

  @OneToMany(() => Account, (p) => p.requestType)
  accountRequest: Account[];
}
