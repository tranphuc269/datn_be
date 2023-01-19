import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class ContactUserInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  state: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  address1: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  address2: string;
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  countryId: number;
}
