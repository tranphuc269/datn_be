import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseApiResponse } from 'src/shared/dtos/base-api-response.dto';
import { ReqContext } from 'src/shared/request-context/req-context.decorator';
import { RequestContext } from 'src/shared/request-context/request-context';
import { CreateAccountTicketInput } from '../dtos/create-account-input.dto';
import { AccountOutput } from '../dtos/create-account-output.dto';
import { UpdateAccountInput } from '../dtos/update-account-input.dto';
import { AccountService } from '../services/account.service';
@Controller('account_request')
@ApiTags('account_request')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('hello')
  async helloWorld(): Promise<string> {
    return 'hello';
  }
  @Post('new-account-request')
  @HttpCode(HttpStatus.CREATED)
  async createPaidTicket(
    @ReqContext() ctx: RequestContext,
    @Body() input: CreateAccountTicketInput
  ): Promise<BaseApiResponse<AccountOutput>> {
    const data = await this.accountService.createAccountRequest(ctx, input);
    return { data, meta: {} };
  }
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateTicket(
    @ReqContext() ctx: RequestContext,
    @Body() input: UpdateAccountInput,
    @Param('id') id: number
  ): Promise<BaseApiResponse<AccountOutput>> {
    const data = await this.accountService.updateAccountRequest(ctx, input, id);
    return { data };
  }
  @Get('my-request/:id')
  async getAllMyRequest(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number
  ): Promise<BaseApiResponse<AccountOutput[]>> {
    const data = await this.accountService.getAllRequest(ctx, userId);
    return { data };
  }
  @Get('request-related/:id')
  async getRequestRelatedMe(
    @ReqContext() ctx: RequestContext,
    @Param('id') userId: number
  ): Promise<BaseApiResponse<AccountOutput[]>> {
    const data = await this.accountService.getRequestRelatedMe(ctx, userId);
    return { data };
  }
  @Get('request/:id')
  async getRequestById(
    @ReqContext() ctx: RequestContext,
    @Param('id') paidId: number
  ): Promise<BaseApiResponse<AccountOutput>> {
    const data = await this.accountService.getRequestById(ctx, paidId);
    return { data };
  }
}
