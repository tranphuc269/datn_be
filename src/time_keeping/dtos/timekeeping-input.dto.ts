import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class TimeKeepingInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  createDate: Date;
  
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
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  oddTime: number;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  workAmountId: number;
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  workTypeId: number;
}
