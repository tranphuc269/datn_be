import { User } from './../entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactUser } from '../entities/contact-user.entity';
import { Country } from '../entities/country.entity';

@Injectable()
export class CountryRepository extends Repository<Country> {}
