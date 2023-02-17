import { DetailErrorCode } from '../../shared/constant/error-code';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ErrCategoryCode, ErrDetailCode } from '../../shared/constant/errors';
export class CreateAccountTicketInput {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.REQUIRED_PARAM,
        ErrDetailCode.NAME
      ),
    },
  })
  @Expose()
  createPersonId: number;
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({
    context: {
      detail: new DetailErrorCode(
        ErrCategoryCode.REQUIRED_PARAM,
        ErrDetailCode.NAME
      ),
    },
  })
  @Expose()
  systemAdminId: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  type: number;
  
  @ApiProperty()
  @IsOptional()
  @Expose()
  targetId: number;

  @ApiProperty()
  @IsOptional()
  @Expose()
  newMemberEmail: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Expose()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @Expose()
  isDeleted: boolean;
}
