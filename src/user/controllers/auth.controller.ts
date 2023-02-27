import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
  Res,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import RequestWithUser from '../interface/requestWithUser.interface';
import { AuthService } from '../services/auth.service';
import { Response } from 'express';
import { JwtAuthenticationGuard } from '../strategies/jwt-authentication.guard';
import { LoginInput } from '../dtos/login-input.dto';
import { UserInput } from '../dtos/register.dto';
import { ReqContext } from 'src/shared/request-context/req-context.decorator';
import { RequestContext } from 'src/shared/request-context/request-context';
import { MeInput } from '../dtos/me.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdatePasswordDto } from '../dtos/update-forgot-password.dto';

@Controller('authentication')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(
    @Body() registrationData: UserInput,
    @ReqContext() ctx: RequestContext
  ) {
    return this.authService.register(registrationData, ctx);
  }
  @Post('log-in')
  async logIn(@Body() input: LoginInput, @ReqContext() ctx: RequestContext) {
    try {
      const data = await this.authService.login(ctx, input);
      if (data) {
        return { data };
      } else {
        return new HttpException(
          'User with this id does not exist',
          HttpStatus.NOT_FOUND
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
  @Post('verify-token')
  async verifyToken(@Body() accessToken: MeInput) {
    const decoded = await this.authService.verifyToken(accessToken.accessToken);
    return decoded;
  }
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password/:email')
  async forgotPassword(
    @ReqContext() ctx: RequestContext,
    @Param('email') email: string
  ) {
    const result = await this.authService.forgotPassword(ctx, email);
    if (result) {
      return { message: 'Success!', code: 200 };
    } else {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('is-valid-forgot-password/:resetKey')
  async checkIsValidResetKey(
    @ReqContext() ctx: RequestContext,
    @Param('resetKey') resetKey: string
  ) {
    const result = await this.authService.checkIsValidResetKey(ctx, resetKey);
    if (result) {
      return result;
    } else {
      throw new HttpException('Code Expired', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('change-forgot-password')
  async changeForgotPassword(
    @ReqContext() ctx: RequestContext,
    @Body() updateData: UpdatePasswordDto
  ) {
    const result = await this.authService.changeForgotPassword(
      ctx,
      updateData.newPassword,
      updateData.resetKey
    );
    if (result) {
      return result;
    } else {
      throw new HttpException('Update Failed !', HttpStatus.BAD_REQUEST);
    }
  }
}
