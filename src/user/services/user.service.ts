import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { RequestContext } from 'src/shared/request-context/request-context';
import { ChangeUserInfo } from '../dtos/change-personal-info.dto';
import { UserPersonalOutput } from '../dtos/user-personal-output.dto';
import { plainToInstance } from 'class-transformer';
import { UserInput } from '../dtos/register.dto';
import { UserPersonalInput } from '../dtos/user-personal-input.dto';
import { UserPersonal } from '../entities/user-personal.entity';
import { UserPersonalRepository } from '../repositories/user-personal.repository';
import { UserWork } from '../entities/user-work.entity';
import { UserWorkRepository } from '../repositories/user-work.repository';
import { ContactUser } from '../entities/contact-user.entity';
import { UserWorkInput } from '../dtos/user-work-input.dto';
import { UserWorkOutput } from '../dtos/user-work-output.dto';
import { ContactUserInput } from '../dtos/contact-user-input.dto';
import { ContactUserOutput } from '../dtos/contact-user-output.dto';
import { ContactUserRepository } from '../repositories/contact-user.repository';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @InjectRepository(UserPersonal)
    private readonly userPersonalRepository: UserPersonalRepository,
    @InjectRepository(UserWork)
    private readonly userWorkRepository: UserWorkRepository,
    @InjectRepository(ContactUser)
    private readonly contactUserRepository: ContactUserRepository
  ) {}

  async getByWorkEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND
    );
  }

  async create(userInfo: any, userData: UserInput, ctx: RequestContext) {
    try {
      const newUser = this.userRepository.create(userData);
      const newUserPersonal = this.createPersonalUser(
        ctx,
        userInfo.userPersonal
      );
      let personalId = (await newUserPersonal).id;

      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id: number) {
    const user = await this.userRepository.findOneBy({
      id,
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND
    );
  }

  async updatePersonalUser(
    ctx: RequestContext,
    input: ChangeUserInfo
  ): Promise<UserPersonalOutput> {
    const user = await this.userRepository.getById(ctx.user.id);
    this.userRepository.merge(user);

    const savedUser = await this.userRepository.save(user);
    return plainToInstance(UserPersonalOutput, savedUser, {
      excludeExtraneousValues: true,
    });
  }
  async createPersonalUser(
    ctx: RequestContext,
    input: UserPersonalInput
  ): Promise<UserPersonalOutput> {
    const newUser = this.userPersonalRepository.create(input);
    await this.userPersonalRepository.save(newUser);
    return newUser;
  }
  async createWorkUser(
    ctx: RequestContext,
    input: UserWorkInput
  ): Promise<UserWorkOutput> {
    const newUser = this.userWorkRepository.create(input);
    await this.userWorkRepository.save(newUser);
    return;
  }
  async createContactUser(
    ctx: RequestContext,
    input: ContactUserInput
  ): Promise<ContactUserOutput> {
    const newUser = this.userWorkRepository.create(input);
    await this.userWorkRepository.save(newUser);
    return;
  }
}
