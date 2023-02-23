import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class MailInput {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  subject: string;
  
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  message: string;
}
