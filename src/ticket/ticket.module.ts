import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaidTicketController } from './controllers/paid_ticket.controller';
import { OvertimeTicket } from './entities/overtime_ticket.entity';
import { PaidTicket } from './entities/paid_ticket.entity';
import { SupplementTicket } from './entities/supplement_ticket.entity';
import { PaidTicketRepository } from './repositories/paid_ticket.repository';
import { PaidTicketService } from './services/paid_ticket.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([PaidTicket]),
    TypeOrmModule.forFeature([OvertimeTicket]),
    TypeOrmModule.forFeature([SupplementTicket]),
  ],
  controllers: [PaidTicketController],
  providers: [PaidTicketService, PaidTicketRepository],
})
export class TicketModule {}
