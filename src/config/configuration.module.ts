import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './module-option';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
