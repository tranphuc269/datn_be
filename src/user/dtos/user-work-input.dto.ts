import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UserWorkInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  workEmail: string;

  @ApiProperty()
  @Expose()
  taxNumber: string;

  @ApiProperty()
  @Expose()
  healthInsuranceNumber: string;

  @ApiProperty()
  @Expose()
  healthInsurancePlace: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  joinDate: Date;

  @ApiProperty()
  @Expose()
  endDate: Date;

  @ApiProperty()
  @Expose()
  bhxhDate: Date;

  @ApiProperty()
  @Expose()
  bhxhRate: string;

  @ApiProperty()
  @Expose()
  bhytDate: Date;


  @ApiProperty()
  @Expose()
  leaveReason: string;
}
