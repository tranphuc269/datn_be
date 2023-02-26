import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

@Exclude()
export class TimeKeepingListInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  month: Date;
}
