import * as bcrypt from 'bcrypt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
import { ChangeUserInfo } from '../dtos/change-user-input.dto';
import * as jwt from 'jsonwebtoken';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ChangeUserWorkInfo } from '../dtos/change-work-info.dto';
import { TimeKeepingListService } from 'src/time_keeping/services/time_keeping-list.service';
import { TimeKeepingListInput } from 'src/time_keeping/dtos/timekeeping-list-input.dto';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from './mail.service';
import { MailInput } from '../dtos/mail.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly timekeepingListService: TimeKeepingListService,
    private readonly mailService: MailService,
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
      const userWorkData = await this.userService.getWorkInfo(
        ctx,
        createdUser.id
      );
      let userWorkUpdate = new ChangeUserWorkInfo();
      userWorkUpdate.id = createdUser.userWork;
      userWorkUpdate.employeeId = `NV000${userWorkData.id}`;
      let newTimeKeepingList = new TimeKeepingListInput();
      newTimeKeepingList.userId = createdUser.id;
      newTimeKeepingList.month = new Date();
      await this.userService.updateWorkUser(ctx, userWorkUpdate);
      await this.timekeepingListService.createTimekeepingList(
        ctx,
        newTimeKeepingList,
        createdUser.id
      );
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
  public async login(ctx: RequestContext, user: LoginInput) {
    try {
      const userData = await this.userService.getByWorkEmail(user.email);
      const isPasswordCorrect = await bcrypt.compare(
        user.password,
        userData.password
      );
      if (!isPasswordCorrect || userData.isDelete) {
        return {
          code: 500,
          msg: userData.isDelete ? 'is_locked' : 'login_failed',
        };
      } else {
        user.password = undefined;
        const payload = {
          email: userData.email,
          id: userData.id,
          role: userData.role,
          isActive: userData.accountStatus,
        };
        let newPayload = new ChangeUserInfo();
        newPayload.accessToken = this.jwtService.sign(payload, {
          secret: process.env.JWT_KEY,
        });
        newPayload.isLogin = 1;
        await this.userService.updateUser(ctx, newPayload, userData.id);
        return {
          access_token: newPayload.accessToken,
        };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
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
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME'
    )}`;
  }
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
  async verifyToken(accessToken: string) {
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_KEY);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async forgotPassword(ctx: RequestContext, email: string) {
    try {
      const user = await this.userService.getByWorkEmail(email);
      if (!user) {
        return null;
      }

      const token = uuidv4();
      let newUpdateUser = new ChangeUserInfo();
      const expiration = new Date();
      expiration.setMinutes(expiration.getMinutes() + 30);
      newUpdateUser.expiredKey = expiration;
      newUpdateUser.resetKey = token;
      const updatedData = await this.userService.updateUser(
        ctx,
        newUpdateUser,
        user.id
      );
      let mailInput = new MailInput();
      mailInput.email = updatedData.email;
      mailInput.subject = 'Forgot password link';
      mailInput.message = `${process.env.URL_FE}forgot-password/${token}/`;
      await this.mailService.sendMail(mailInput);
      return updatedData;
    } catch (error) {}
  }

  async checkIsValidResetKey(ctx: RequestContext, resetKey: string) {
    try {
      const user = await this.userService.checkIsValidResetKey(ctx, resetKey);
      if (user) {
        return user;
      }
      return null;
    } catch (error) {}
  }
  async changeForgotPassword(
    ctx: RequestContext,
    password: string,
    restKey: string
  ) {
    try {
      const userEmail = await this.checkIsValidResetKey(ctx, restKey);
      if (!userEmail) {
        return null;
      }
      const user = await this.userService.getByWorkEmail(userEmail.email);
      const hashPassword = await bcrypt.hash(password, 10);
      let updatePasswordData = new ChangeUserInfo();
      updatePasswordData.password = hashPassword;
      return await this.userService.updateUser(
        ctx,
        updatePasswordData,
        user.id
      );
    } catch (error) {}
  }
}
