import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { ChangeUserWorkInfo } from '../dtos/change-work-info.dto';
import { ChangeContactUserInfo } from '../dtos/change-contact-user.dto';
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
    } else {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND
      );
    }
  }

  async create(userInfo: any, userData: UserInput, ctx: RequestContext) {
    try {
      const existUser = await this.userRepository.findBy({
        email: userData.email,
      });
      if (existUser.length > 0) {
        throw new NotFoundException(`Email exist`);
      }
      const newUser = this.userRepository.create(userData);

      const newUserPersonal = this.userPersonalRepository.create(
        userInfo.userPersonal as UserPersonal
      );
      const savedUserPersonal = await this.userPersonalRepository.save(
        newUserPersonal
      );

      const newUserWork = this.userWorkRepository.create(
        userInfo.userWorkInfo as UserWork
      );
      const savedUserWork = await this.userWorkRepository.save(newUserWork);

      const newUserContact = this.contactUserRepository.create(
        userInfo.contactUser as ContactUser
      );
      const savedUserContact = await this.contactUserRepository.save(
        newUserContact
      );

      newUser.userPersonal = savedUserPersonal.id;
      newUser.userWork = savedUserWork.id;
      newUser.contactUser = savedUserContact.id;

      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
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
    let userId = input.id;
    const user = await this.userPersonalRepository.findOneBy({ id: userId });
    this.userPersonalRepository.merge(user, input);

    const savedUser = await this.userPersonalRepository.save(user);
    return plainToInstance(UserPersonalOutput, savedUser, {
      excludeExtraneousValues: true,
    });
  }
  async updateWorkUser(
    ctx: RequestContext,
    input: ChangeUserWorkInfo
  ): Promise<UserWorkOutput> {
    let userId = input.id;
    const user = await this.userWorkRepository.findOneBy({ id: userId });
    this.userWorkRepository.merge(user, input);

    const savedUser = await this.userWorkRepository.save(user);
    return plainToInstance(UserWorkOutput, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async updateContactUser(
    ctx: RequestContext,
    input: ChangeContactUserInfo
  ): Promise<ContactUserOutput> {
    let userId = input.id;
    const user = await this.contactUserRepository.findOneBy({ id: userId });
    this.contactUserRepository.merge(user, input);

    const savedUser = await this.contactUserRepository.save(user);
    return plainToInstance(ContactUserOutput, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async createPersonalUser(
    ctx: RequestContext,
    input: UserPersonalInput
  ): Promise<UserPersonalOutput> {
    const newUser = this.userPersonalRepository.create(input);
    let saveUser = await this.userPersonalRepository.save(newUser);
    return saveUser;
  }
  async createWorkUser(
    ctx: RequestContext,
    input: UserWorkInput
  ): Promise<UserWorkOutput> {
    const newUser = this.userWorkRepository.create(input);
    let saveUser = await this.userWorkRepository.save(newUser);
    return saveUser;
  }
  async createContactUser(
    ctx: RequestContext,
    input: ContactUserInput
  ): Promise<ContactUserOutput> {
    const newUser = this.contactUserRepository.create();
    await this.contactUserRepository.save(newUser);
    return;
  }
  async getPersonalInfo(
    ctx: RequestContext,
    id: number
  ): Promise<UserPersonalOutput> {
    try {
      const user = await this.userRepository.findOneBy({
        id,
      });
      if (user) {
        return await this.userPersonalRepository.findOneBy({
          id: user.userPersonal,
        });
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }
  async getWorkInfo(ctx: RequestContext, id: number): Promise<UserWorkOutput> {
    try {
      const user = await this.userRepository.findOneBy({
        id,
      });
      if (user) {
        return await this.userWorkRepository.findOneBy({
          id: user.userWork,
        });
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }
}
