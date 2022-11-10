import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactUser } from '../entities/contact-user.entity';
import { UserPersonal } from '../entities/user-personal.entity';

@Injectable()
export class UserPersonalRepository extends Repository<UserPersonal> {
  async getById(id: number): Promise<UserPersonal> {
    const entity = await this.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(` not found`);
    }
    return entity;
  }
  //   async getByEmail(email: string): Promise<ContactUser> {
  //     const entity = await this.findOne({ email });
  //     if (!entity) {
  //       throw new NotFoundException(` not found`);
  //     }
  //     return entity;
  //   }
}
