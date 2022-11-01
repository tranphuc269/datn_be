import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeKeepingController } from './controllers/time_keeping.controller';
import { TimeKeeping } from './entities/time_keeping.entity';
import { TimeKeepingRepository } from './repositories/time_keeping.repository';
import { TimeKeepingService } from './services/time_keeping.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([TimeKeeping])],
  controllers: [TimeKeepingController],
  providers: [TimeKeepingService, TimeKeepingRepository],
})
export class TimeKeepingModule {}
