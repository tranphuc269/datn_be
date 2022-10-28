import { ConfigurationModule } from './../config/configuration.module';
import { Module } from '@nestjs/common';

@Module({ imports: [ConfigurationModule] })
export class UserModule {}
