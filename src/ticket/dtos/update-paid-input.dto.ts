import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePaidInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  createPersonId: number;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  relatedPersonId: number;
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  approverPersonId: number;
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  substitutePersonId: number;
  
  @ApiProperty()
  @Expose()
  ticketStatusId: number;
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  startTime: Date;
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  endTime: Date;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  reason: string;
  
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  typePaidId: number;
}
