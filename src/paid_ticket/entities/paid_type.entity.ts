import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('paid_types')
export class PaidType {
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
  name: string;

  @Column({
    name: 'coefficient_salary',
    type: 'double',
  })
  coefficientSalary: number;
}
