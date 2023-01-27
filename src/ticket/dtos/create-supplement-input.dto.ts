import { DetailErrorCode } from '../../shared/constant/error-code';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ErrCategoryCode, ErrDetailCode } from '../../shared/constant/errors';
export class CreateSupplementTicketInput {
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
  relatedPersonId: number;

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
  approverPersonId: number;

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
  ticketStatusId: number;

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
  startTime: Date;
  
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
  approveDate: Date;

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
  endTime: Date;

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
  reason: string;
  
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Expose()
  isOT: boolean;
}
