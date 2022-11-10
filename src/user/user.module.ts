import { User } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserPersonalRepository } from './repositories/user-personal.repository';
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController, AuthController],
  exports: [
    JwtService,
    UserService,
    UserRepository,
    AuthService,
    UserPersonalRepository,
  ],
  providers: [
    JwtService,
    UserService,
    UserRepository,
    UserPersonalRepository,
    AuthService,
    LocalStrategy,
  ],
})
export class UserModule {}
