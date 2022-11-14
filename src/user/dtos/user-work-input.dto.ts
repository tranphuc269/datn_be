import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UserWorkInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  lastName: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  birthday: Date;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  identificationIdObj: string;
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  passportObj: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  gender: number;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  nationalId: number;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  religionId: number;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  ethnicityId: number;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  maritalStatusId: number;
}
