import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactUser } from '../entities/contact-user.entity';

@Injectable()
export class ContactUserRepository extends Repository<ContactUser> {
  async getById(id: number): Promise<ContactUser> {
    const entity = await this.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(` not found`);
    }
    return entity;
  }
}
