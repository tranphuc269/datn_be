import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactUser } from '../entities/contact-user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  async getById(id: number): Promise<User> {
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
