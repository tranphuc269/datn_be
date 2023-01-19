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

export class PaidUpdateInput {

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  relatedPersonId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  approverPersonId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  substitutePersonId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  ticketStatusId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  startTime?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  endTime?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  reason?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  typePaidId?: number;
}
