import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UserWorkInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  workEmail: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  taxNumber: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  joinDate: Date;
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  endDate: Date;
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  bhytDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  healthInsuranceNumber: string;
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  healthInsurancePlace: string;
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  identificationIdObj: string;
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  passportObj: string;
}
