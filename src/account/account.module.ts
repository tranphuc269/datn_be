import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeKeepingModule } from '../time_keeping/time_keeping.module';
import { TimeKeepingRepository } from '../time_keeping/repositories/time_keeping.repository';
import { TimeKeepingService } from '../time_keeping/services/time_keeping.service';
import { TimeKeeping } from '../time_keeping/entities/time_keeping.entity';
import { AccountService } from './services/account.service';
import { AccountController } from './controllers/account.controller';
import { AccountRepository } from './repositories/account.repository';
import { Account } from './entities/account.entity';

@Module({
  imports: [
    ConfigModule,
    TimeKeepingModule,
    TypeOrmModule.forFeature([Account, TimeKeeping]),
  ],
  controllers: [AccountController],
  providers: [
    TimeKeepingService,
    TimeKeepingRepository,
    AccountService,
    AccountRepository,
  ],
})
export class AccountModule {}
