import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CountryInput {
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  name: string;
}
