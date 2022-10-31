import * as Joi from '@hapi/joi';
import { ConfigModuleOptions } from '@nestjs/config';

import configuration from './configuration';

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: '.env',
  load: [configuration],
  validationSchema: Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().optional(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
    DB_CHARSET: Joi.string(),
    JWT_KEY : Joi.string().required(),
    JWT_EXPIRATION_TIME: Joi.string().required(),
  }),
};
