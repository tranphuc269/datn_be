import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
export class ChangeUserInfo {
  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  lastName: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  identificationIdObj?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  passportObj?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  gender?: number;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  nationalId?: number;
  
  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  religionId: number;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  ethnicityId: number;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  maritalStatusId: number;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  birthday?: Date;
}
