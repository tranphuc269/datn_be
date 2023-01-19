import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UserPersonalInput {
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
  identificationIdDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  identificationIdObj: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  placeID: string;

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
  nationalId: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  religionId: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  ethnicityId: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  maritalStatusId: string;
}
