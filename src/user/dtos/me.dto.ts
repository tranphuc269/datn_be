import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class MeInput {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  accessToken: string;
}
