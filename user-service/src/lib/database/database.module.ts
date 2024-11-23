import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { InitMigration1732273303001 } from './migrations/1732273303001-InitMigration';
import { getEnvVariable } from '../utils/env';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const databaseConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: getEnvVariable('DATABASE_HOST'),
  port: parseInt(getEnvVariable('DATABASE_PORT'), 10),
  database: getEnvVariable('DATABASE_NAME'),
  username: getEnvVariable('DATABASE_USER'),
  password: getEnvVariable('DATABASE_PASSWORD'),
  migrations: [InitMigration1732273303001],
  entities: [UserEntity],
  uuidExtension: 'uuid-ossp',
  connectTimeoutMS: 15000,
  maxQueryExecutionTime: 10000,
  extra: {
    min: 2,
    max: 30,
    connectionTimeoutMillis: 15000,
  },
  synchronize: false,
  installExtensions: false,
  logNotifications: false,
  logging: false,
  logger: 'simple-console',
};
@Global()
@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), UserEntity],
})
export class DatabaseModule {}
