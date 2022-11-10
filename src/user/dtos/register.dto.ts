import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UserInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  accountStatus: number;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  role: number;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  email: string;
}
