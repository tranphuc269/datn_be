import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  resetKey: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  newPassword: string;
}
