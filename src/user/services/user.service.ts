import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository
  ) {}

  async getByEmail(email: string) {
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

  async create(userData: CreateUserDto) {
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
}
