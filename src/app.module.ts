import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './config/configuration.module';
import { UserModule } from './user/user.module';
import { TimeKeepingModule } from './time_keeping/time_keeping.module';
import { TicketModule } from './ticket/ticket.module';
@Module({
  imports: [
    ConfigurationModule,
    UserModule,
    TimeKeepingModule,
    TicketModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.pass'),
        port: configService.get<number>('database.port'),
        host: configService.get<string>('database.host'),
        entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
        synchronize: false,
        autoLoadEntities: true,
        migration: [__dirname + '/migrations/*{.ts,.js}'],
        logging: true
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

