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
import { ChangeUserPersonalInfo } from '../dtos/change-personal-info.dto';
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
import { UserOutput } from '../dtos/user-output.dto';
import { ChangeUserInfo } from '../dtos/change-user-input.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';
import { CountryInput } from '../dtos/country.dto';
import { CountryRepository } from '../repositories/country.repository';
import { Country } from '../entities/country.entity';
@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @InjectRepository(UserPersonal)
    private readonly userPersonalRepository: UserPersonalRepository,
    @InjectRepository(UserWork)
    private readonly userWorkRepository: UserWorkRepository,
    @InjectRepository(ContactUser)
    private readonly contactUserRepository: ContactUserRepository,
    @InjectRepository(Country)
    private readonly countryRepository: CountryRepository
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
      console.log(existUser);
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
  async updateUser(
    ctx: RequestContext,
    input: ChangeUserInfo,
    id: number
  ): Promise<UserOutput> {
    const user = await this.userRepository.findOneBy({ id: id });
    this.userRepository.merge(user, input);
    const savedUser = await this.userRepository.save(user);
    return plainToInstance(UserOutput, savedUser, {
      excludeExtraneousValues: true,
    });
  }
  async updatePersonalUser(
    ctx: RequestContext,
    input: ChangeUserPersonalInfo
  ): Promise<UserPersonalOutput> {
    let userId = input.id;
    const userPersonal = await this.userPersonalRepository.findOneBy({
      id: userId,
    });
    const user = await this.userRepository.findOneBy({ userPersonal: userId });
    this.userPersonalRepository.merge(userPersonal, input);

    const savedUser = await this.userPersonalRepository.save(userPersonal);
    if (user.accountStatus === 1) {
      let updateUser = new ChangeUserInfo();
      updateUser.accountStatus = 2;
      this.updateUser(ctx, updateUser, user.id);
    }
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
  async getContactInfo(
    ctx: RequestContext,
    id: number
  ): Promise<ContactUserOutput> {
    try {
      const user = await this.userRepository.findOneBy({
        id,
      });
      if (user) {
        const data = await this.contactUserRepository.findOneBy({
          id: user.contactUser,
        });
        if (data) {
          return { ...data, email: user.email };
        }
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

  async getListCountry(): Promise<string[]> {
    try {
      const response = await this.httpService
        .get('https://restcountries.com/v3.1/all')
        .toPromise();
      let countryNames = response.data
        .map((country) => country.name.common)
        .sort((a, b) => {
          if (a > b) {
            return 1;
          }

          if (a < b) {
            return -1;
          }

          return 0;
        });
      let countryInput = new CountryInput();
      countryNames.forEach((element) => {
        countryInput.name = element;
        this.createCountry(countryInput);
      });
      return countryNames;
    } catch (error) {}
  }

  async createCountry(input: CountryInput) {
    const newUser = this.countryRepository.create(input);
    let saveUser = await this.countryRepository.save(newUser);
    return saveUser;
  }
  async getCountryArr() {
    try {
      let arrCountry = await this.countryRepository.find();
      return arrCountry;
    } catch (error) {}
  }
  async getDefaultData(ctx: RequestContext, userId: number) {
    try {
      const user = await this.getById(userId);
      const userPersonal = await this.getPersonalInfo(ctx, userId);
      const userWork = await this.getWorkInfo(ctx, userId);

      const returnData = {
        name: userPersonal.firstName + ' ' + userPersonal.lastName,
        employeeId: userWork.employeeId,
      };
      return returnData;
    } catch (error) {}
  }
}
