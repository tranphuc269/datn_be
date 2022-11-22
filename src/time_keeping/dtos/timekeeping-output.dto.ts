import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TimeKeepingOutput {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  userId?: number;

  @ApiProperty()
  @Expose()
  createDate?: Date;

  @ApiProperty()
  @Expose()
  morningJoin?: Date;

  @ApiProperty()
  @Expose()
  morningLeave?: Date;

  @ApiProperty()
  @Expose()
  afternoonJoin?: Date;

  @ApiProperty()
  @Expose()
  afternoonLeave?: Date;

  @ApiProperty()
  @Expose()
  oddTime: number;

  @ApiProperty()
  @Expose()
  workAmountId: number;

  @ApiProperty()
  @Expose()
  workTypeId: number;
}
