import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAccountInput {
  @ApiProperty()
  @IsOptional()
  @Expose()
  createPersonId: number;
  @ApiProperty()
  @IsOptional()
  @Expose()
  systemAdminId: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  type: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  targetId: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  newMemberEmail: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  isDeleted: boolean;
}
