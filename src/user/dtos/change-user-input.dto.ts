import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
export class ChangeUserInfo {
  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  accountStatus: number;

  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  role: number;

  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  isLogin: number;

  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  isDelete: number;

  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  accessToken: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  resetKey: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  expiredKey: Date;

  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  password: string;

  @IsOptional()
  @ApiPropertyOptional()
  @Expose()
  email: string;
}
