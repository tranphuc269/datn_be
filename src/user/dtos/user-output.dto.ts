import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserOutput {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  accountStatus: number;

  @ApiProperty()
  @Expose()
  role: number;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  password: string;

  @ApiProperty()
  @Expose()
  userPersonal: number;

  @ApiProperty()
  @Expose()
  userWork: number;

  @ApiProperty()
  @Expose()
  contactUser: number;

  @ApiProperty()
  @Expose()
  isLogin: number;

  @ApiProperty()
  @Expose()
  isDelete: number;

  @ApiProperty()
  @Expose()
  accessToken: string;
}
