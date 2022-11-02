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
  }
  