import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserWorkOutput {
  @ApiProperty()
  @Expose()
  id: number;
  
  @ApiProperty()
  @Expose()
  workEmail: string;

  @ApiProperty()
  @Expose()
  taxNumber: string;

  @ApiProperty()
  @Expose()
  joinDate: Date;
  
  @ApiProperty()
  @Expose()
  endDate: Date;
  
  @ApiProperty()
  @Expose()
  bhytDate: Date;

  @ApiProperty()
  @Expose()
  healthInsuranceNumber: string;
  
  @ApiProperty()
  @Expose()
  healthInsurancePlace: string;
  
  @ApiProperty()
  @Expose()
  identificationIdObj: string;
  
  @ApiProperty()
  @Expose()
  passportObj: string;
}
