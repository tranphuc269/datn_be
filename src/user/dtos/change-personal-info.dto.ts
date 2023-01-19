import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
export class ChangeUserInfo {
  @ApiPropertyOptional()
  @Expose()
  id?: number;

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
  nationalId?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  religionId: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  ethnicityId: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  maritalStatusId: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  birthday?: Date;
}
