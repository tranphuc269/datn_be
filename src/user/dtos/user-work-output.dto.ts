import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserWorkOutput {
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
  passportObj: string;

  @ApiProperty()
  @Expose()
  gender: number;

  @ApiProperty()
  @Expose()
  nationalId: number;

  @ApiProperty()
  @Expose()
  religionId: number;

  @ApiProperty()
  @Expose()
  ethnicityId: number;

  @ApiProperty()
  @Expose()
  maritalStatusId: number;
}
