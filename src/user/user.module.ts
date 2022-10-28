import { User } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [UserService, UserRepository],
  providers: [UserService, UserRepository],
})
export class UserModule {}

