import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class PaidStatusUpdateInput {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  ticketStatusId?: number;
}
