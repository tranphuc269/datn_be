import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseApiResponse } from 'src/shared/dtos/base-api-response.dto';
import { ReqContext } from 'src/shared/request-context/req-context.decorator';
import { RequestContext } from 'src/shared/request-context/request-context';
import { ChangeUserInfo } from '../dtos/change-personal-info.dto';
import { UserPersonalOutput } from '../dtos/user-personal-output.dto';
import { UserPersonalInput } from '../dtos/user-personal-input.dto';
import { UserService } from '../services/user.service';
import { UserWorkInput } from '../dtos/user-work-input.dto';
import { UserWorkOutput } from '../dtos/user-work-output.dto';
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
  @Post('create-work')
  async createWorkInfo(
    @ReqContext() ctx: RequestContext,
    @Body() input: UserWorkInput
  ): Promise<BaseApiResponse<UserWorkOutput>> {
    const data = await this.userService.createWorkUser(ctx, input);

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
}
