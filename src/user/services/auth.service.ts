import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserInput } from '../dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  public async register(registrationData: UserInput) {
    const hashPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashPassword,
      });
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
  public async login(email: string, hashedPassword: string) {
    try {
      const user = await this.userService.getByWorkEmail(email);
      const isPasswordCorrect = await bcrypt.compare(
        hashedPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST
        );
      }
      user.password = undefined;
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string
  ) {
    try {
      const user = await this.userService.getByWorkEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
    } catch (error) {
      console.log(error)
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
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    console.log(payload)
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME'
    )}`;
  }
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
