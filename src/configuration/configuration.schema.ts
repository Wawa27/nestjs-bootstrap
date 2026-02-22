import * as Joi from 'joi';

export const configurationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .required(),

  PORT: Joi.number().port().default(3000),

  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly')
    .default('info'),

  LOG_JSON: Joi.boolean().truthy('true').falsy('false').default(false),

  LOG_LOKI_ENABLED: Joi.boolean().truthy('true').falsy('false').default(false),

  LOG_LOKI_HOST: Joi.string().uri().when('LOG_LOKI_ENABLED', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),

  LOG_SERVICE_NAME: Joi.string().default('nestjs-app'),
});
