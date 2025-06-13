import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
}

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true); // Allow additional properties

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = value;

export const envs = {
  port: envsVars.PORT,
  databaseUrl: envsVars.DATABASE_URL,
};
