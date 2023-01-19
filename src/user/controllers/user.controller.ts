import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseApiResponse } from 'src/shared/dtos/base-api-response.dto';
import { ReqContext } from 'src/shared/request-context/req-context.decorator';
import { RequestContext } from 'src/shared/request-context/request-context';
import { ChangeUserInfo } from '../dtos/change-personal-info.dto';
import { UserPersonalOutput } from '../dtos/user-personal-output.dto';
import { UserPersonalInput } from '../dtos/user-personal-input.dto';
import { UserWorkInput } from '../dtos/user-work-input.dto';
import { UserService } from '../services/user.service.spec';
import { ChangeUserWorkInfo } from '../dtos/change-work-info.dto';
import { UserWorkOutput } from '../dtos/user-work-output.dto';
import { ContactUserInput } from '../dtos/contact-user-input.dto';
import { ContactUserOutput } from '../dtos/contact-user-output.dto';
import { ChangeContactUserInfo } from '../dtos/change-contact-user.dto';
@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('hello')
  async helloWorld(): Promise<string> {
    return 'hello';
  }

  @Post('create-personal')
  async createPersonalInfo(
    @ReqContext() ctx: RequestContext,
    @Body() input: UserPersonalInput
  ): Promise<BaseApiResponse<UserPersonalOutput>> {
    const data = await this.userService.createPersonalUser(ctx, input);

    return { data };
  }

  @Get('user-personal-info/:id')
  async getPersonalInfo(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number
  ) {
    const data = await this.userService.getPersonalInfo(ctx, id);
    if (data) {
      return data;
    } else {
      throw new HttpException(
        'User information with this id does not exist',
        HttpStatus.NOT_FOUND
      );
    }
  }
  @Get('user-work-info/:id')
  async getWorkInfo(
    @ReqContext() ctx: RequestContext,
    @Param('id') id: number
  ) {
    const data = await this.userService.getWorkInfo(ctx, id);
    if (data) {
      return data;
    } else {
      throw new HttpException(
        'User information with this id does not exist',
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Post('create-work')
  async createWorkInfo(
    @ReqContext() ctx: RequestContext,
    @Body() input: UserWorkInput
  ): Promise<BaseApiResponse<UserWorkOutput>> {
    const data = await this.userService.createWorkUser(ctx, input);

    return { data };
  }
  @Post('create-contact')
  async createContactInfo(
    @ReqContext() ctx: RequestContext,
    @Body() input: ContactUserInput
  ): Promise<BaseApiResponse<ContactUserOutput>> {
    const data = await this.userService.createContactUser(ctx, input);

    return { data };
  }

  @Post('change-personal')
  async changePersonalInfo(
    @ReqContext() ctx: RequestContext,
    @Body() input: ChangeUserInfo
  ): Promise<BaseApiResponse<UserPersonalOutput>> {
    const data = await this.userService.updatePersonalUser(ctx, input);

    return { data };
  }

  @Post('change-work')
  async changeWorkInfo(
    @ReqContext() ctx: RequestContext,
    @Body() input: ChangeUserWorkInfo
  ): Promise<BaseApiResponse<UserWorkOutput>> {
    const data = await this.userService.updateWorkUser(ctx, input);
    return { data };
  }

  @Post('change-contact')
  async changeContactInfo(
    @ReqContext() ctx: RequestContext,
    @Body() input: ChangeContactUserInfo
  ): Promise<BaseApiResponse<ContactUserOutput>> {
    const data = await this.userService.updateContactUser(ctx, input);
    return { data };
  }
}
