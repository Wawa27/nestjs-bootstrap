import * as Joi from 'joi';

export const configurationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .required(),
  PORT: Joi.number().port().default(3000),
});
