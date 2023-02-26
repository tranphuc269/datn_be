import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeKeepingListController } from './controllers/time_keeping-list.controller';
import { TimeKeepingController } from './controllers/time_keeping.controller';
import { TimeKeepingList } from './entities/time_keeping-list.entity';
import { TimeKeeping } from './entities/time_keeping.entity';
import { TimeKeepingListRepository } from './repositories/time_keeping-list.repository';
import { TimeKeepingRepository } from './repositories/time_keeping.repository';
import { TimeKeepingListService } from './services/time_keeping-list.service';
import { TimeKeepingService } from './services/time_keeping.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TimeKeeping, TimeKeepingList]),
  ],
  controllers: [TimeKeepingController, TimeKeepingListController],
  providers: [
    TimeKeepingService,
    TimeKeepingRepository,
    TimeKeepingListRepository,
    TimeKeepingListService,
  ],
})
export class TimeKeepingModule {}
