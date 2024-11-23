import 'dotenv/config';

export function getEnvVariable(name: keyof EnvVariableInterface): string {
  return process.env[name];
}

export interface EnvVariableInterface {
  DATABASE_HOST: string;
  DATABASE_PORT: string;
  DATABASE_NAME: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  PORT: number;
  RABBITMQ_URL: string;
  NOTIFICATION_DELAY: string;
}
