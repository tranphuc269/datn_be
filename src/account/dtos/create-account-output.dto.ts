import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
export class AccountOutput {
  @Expose()
  @ApiProperty()
  createPersonId: number;
  @Expose()
  @ApiProperty()
  systemAdminId: number;
  @Expose()
  @ApiProperty()
  type: number;
  @Expose()
  @ApiProperty()
  targetId: number;
  @Expose()
  @ApiProperty()
  newMemberEmail: string;
  @Expose()
  @ApiProperty()
  firstName: string;
  @Expose()
  @ApiProperty()
  lastName: string;
  @Expose()
  @ApiProperty()
  isDeleted: boolean;
}
