import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ticket_statuses')
export class TicketStatus {
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
  @Column({
    name: 'code',
    type: 'int',
  })
  code: string;
}

