import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaidTicket } from './entities/paid_ticket.entity';
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([PaidTicket])],
})
export class UserModule {}
