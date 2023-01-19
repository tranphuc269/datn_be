import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserPersonalOutput {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @Expose()
  birthday: Date;

  @ApiProperty()
  @Expose()
  identificationIdObj: string;

  @ApiProperty()
  @Expose()
  identificationIdDate: Date;

  @ApiProperty()
  @Expose()
  placeID: string;

  @ApiProperty()
  @Expose()
  passportObj: string;

  @ApiProperty()
  @Expose()
  gender: number;

  @ApiProperty()
  @Expose()
  nationalId: string;

  @ApiProperty()
  @Expose()
  religionId: string;

  @ApiProperty()
  @Expose()
  ethnicityId: string;

  @ApiProperty()
  @Expose()
  maritalStatusId: string;
}
