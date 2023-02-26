import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
export class ChangeUserWorkInfo {
  @ApiPropertyOptional()
  @Expose()
  id?: number;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  employeeId?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  workEmail?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  taxNumber: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  healthInsuranceNumber?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  healthInsurancePlace?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  joinDate?: Date;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  bhxhDate?: Date;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  bhxhRate?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  bhytDate?: Date;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  leaveReason?: string;
}
