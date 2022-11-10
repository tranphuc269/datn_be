import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { Repository } from 'typeorm';
import { RequestContext } from 'src/shared/request-context/request-context';
import { ChangeUserInfo } from '../dtos/change-personal-info.dto';
import { UserPersonalOutput } from '../dtos/user-personal-output.dto';
import { plainToInstance } from 'class-transformer';
import { UserInput } from '../dtos/register.dto';
import { UserPersonalInput } from '../dtos/user-personal-input.dto';
import { UserPersonal } from '../entities/user-personal.entity';
import { UserPersonalRepository } from '../repositories/user-personal.repository';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @InjectRepository(UserPersonal)
    private readonly userPersonalRepository: UserPersonalRepository
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

  async create(userData: UserInput) {
    try {
      const newUser = this.userRepository.create(userData);
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
    await this.userRepository.save(newUser);
    return newUser;
  }
}
