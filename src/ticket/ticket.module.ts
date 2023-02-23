import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeKeepingModule } from '../time_keeping/time_keeping.module';
import { TimeKeepingRepository } from '../time_keeping/repositories/time_keeping.repository';
import { TimeKeepingService } from '../time_keeping/services/time_keeping.service';
import { PaidTicketController } from './controllers/paid_ticket.controller';
import { OvertimeTicket } from './entities/overtime_ticket.entity';
import { PaidTicket } from './entities/paid_ticket.entity';
import { SupplementTicket } from './entities/supplement_ticket.entity';
import { PaidTicketRepository } from './repositories/paid_ticket.repository';
import { PaidTicketService } from './services/paid_ticket.service';
import { TimeKeeping } from '../time_keeping/entities/time_keeping.entity';
import { SupplementTicketRepository } from './repositories/supplement_ticket.repository';
import { SupplementTicketController } from './controllers/supplement_ticket.controller';
import { SupplementTicketService } from './services/supplement_ticket.service';
import { PaidTypeRepository } from './repositories/paid_type.repository';
import { PaidTypeService } from './services/paidtype.service';
import { PaidType } from './entities/paid_type.entity';
import { UserService } from '../user/services/user.service.spec';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule,
    TimeKeepingModule,
    UserModule,
    TypeOrmModule.forFeature([
      PaidTicket,
      OvertimeTicket,
      SupplementTicket,
      TimeKeeping,
      PaidType,
      User,
    ]),
  ],
  controllers: [PaidTicketController, SupplementTicketController],
  providers: [
    TimeKeepingService,
    TimeKeepingRepository,
    PaidTicketService,
    PaidTicketRepository,
    SupplementTicketRepository,
    SupplementTicketService,
    PaidTypeRepository,
    PaidTypeService,
  ],
})
export class TicketModule {}
