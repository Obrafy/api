import * as Joi from 'joi';
import { ConfigInterface } from '.';

export default Joi.object<ConfigInterface>({
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),

  PORT: Joi.number().default(3000),

  DB_BASE_URI: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_URI: Joi.string().uri().required(),

  AUTHENTICATION_HOST: Joi.string().hostname().default('localhost'),
  AUTHENTICATION_PORT: Joi.number().default(3010),
});
