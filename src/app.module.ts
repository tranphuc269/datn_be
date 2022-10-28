import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigurationModule } from './config/configuration.module';
import { UserModule } from "./user/user.module"

@Module({
  imports: [
    ConfigurationModule,
    UserModule,
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
        entities: [__dirname + 'src/models/entities/*.entity{.ts,.js}'],
        synchronize: false,
        migration: [__dirname + '/src/migrations/*{.ts,.js}'],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
