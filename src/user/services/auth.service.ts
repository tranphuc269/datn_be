import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserInput } from '../dtos/register.dto';
import { UserPersonal } from '../entities/user-personal.entity';
import { ContactUser } from '../entities/contact-user.entity';
import { UserWork } from '../entities/user-work.entity';
import { RequestContext } from 'src/shared/request-context/request-context';
import { UserWorkInput } from '../dtos/user-work-input.dto';
import { UserService } from './user.service.spec';
import { LoginInput } from '../dtos/login-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  public async register(registrationData: UserInput, ctx: RequestContext) {
    const hashPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const userPersonal: UserPersonal = new UserPersonal();
      const contactUser: ContactUser = new ContactUser();
      const userWork: UserWork = new UserWork();
      userWork.joinDate = new Date();
      const userInfo = {
        userPersonalInfo: userPersonal,
        contactUserInfo: contactUser,
        userWorkInfo: userWork,
      };
      const createdUser = await this.userService.create(
        userInfo,
        {
          ...registrationData,
          password: hashPassword,
        },
        ctx
      );
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      console.log(error);
      if (error?.code === 23505) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  public async login(user: LoginInput) {
    try {
      const userData = await this.userService.getByWorkEmail(user.email);
      const isPasswordCorrect = await bcrypt.compare(
        user.password,
        userData.password
      );
      if (!isPasswordCorrect) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST
        );
      }
      user.password = undefined;
      const payload = { email: userData.email, sub: userData.id };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_KEY,
        }),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByWorkEmail(email);
      const isPasswordCorrect = await this.verifyPassword(
        plainTextPassword,
        user.password
      );
      return isPasswordCorrect ? user : null;
    } catch (error) {
      console.log(error);
    }
  }
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordCorrect = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordCorrect) {
      return new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
    return isPasswordCorrect;
  }
  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    console.log(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME'
    )}`;
  }
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
