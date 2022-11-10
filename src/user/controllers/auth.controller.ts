import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
  Res,
  Get,
} from '@nestjs/common';
import RequestWithUser from '../interface/requestWithUser.interface';
import { AuthService } from '../services/auth.service';
import { LocalAuthenticationGuard } from '../strategies/localAuthentication.guard';
import { Response } from 'express';
import { JwtAuthenticationGuard } from '../strategies/jwt-authentication.guard';
import { LoginInput } from '../dtos/login-input.dto';
import { plainToInstance } from 'class-transformer';
import { UserTokenOutput } from '../dtos/user-token-output.dto';
import { UserInput } from '../dtos/register.dto';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registrationData: UserInput) {
    return this.authService.register(registrationData);
  }
  @HttpCode(200)
  @Post('log-in')
  async logIn(@Body() input: LoginInput) {
    try {
      const data = await this.authService.getAuthenticatedUser(
        input.email,
        input.password
      );
      return { data };
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
}
