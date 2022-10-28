import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {}

