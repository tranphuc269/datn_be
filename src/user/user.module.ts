import { User } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserPersonalRepository } from './repositories/user-personal.repository';
import { UserPersonal } from './entities/user-personal.entity';
import { UserWork } from './entities/user-work.entity';
import { ContactUser } from './entities/contact-user.entity';
import { UserWorkRepository } from './repositories/user-work.repository';
import { ContactUserRepository } from './repositories/contact-user.repository';
import { UserService } from './services/user.service.spec';
import { MailService } from './services/mail.service';
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, UserPersonal, UserWork, ContactUser, UserPersonalRepository])],
  controllers: [UserController, AuthController],
  exports: [
    JwtService,
    UserService,
    UserRepository,
    AuthService,
    UserPersonalRepository,
    UserWorkRepository,
    MailService,
    ContactUserRepository
  ],
  providers: [
    JwtService,
    UserService,
    UserRepository,
    UserPersonalRepository,
    UserWorkRepository,
    ContactUserRepository,
    AuthService,
    MailService,
    LocalStrategy,
  ],
})
export class UserModule {}
