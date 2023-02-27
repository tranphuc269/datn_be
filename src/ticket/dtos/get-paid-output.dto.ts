import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
export class GetPaidTicketOutput {
  @Expose()
  @ApiProperty()
  createPersonId: number;
  @Expose()
  @ApiProperty()
  id: number;
  @Expose()
  @ApiProperty()
  relatedPersonId: number;
  @Expose()
  @ApiProperty()
  approverPersonId: number;
  @Expose()
  @ApiProperty()
  substitutePersonId: number;
  @Expose()
  @ApiProperty()
  ticketStatusId: number;
  @Expose()
  @ApiProperty()
  startTime: Date;
  @Expose()
  @ApiProperty()
  endTime: Date;
  @Expose()
  @ApiProperty()
  reason: string;
  @Expose()
  @ApiProperty()
  typePaidId: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  employeeId: string;
}