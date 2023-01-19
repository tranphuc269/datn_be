import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserWork } from '../entities/user-work.entity';

@Injectable()
export class UserWorkRepository extends Repository<UserWork> {
  async getById(id: number): Promise<UserWork> {
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
