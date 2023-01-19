import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
export class ChangeContactUserInfo {
  @ApiPropertyOptional()
  @Expose()
  id?: number;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  address1?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  address2?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  countryId?: number;
}
