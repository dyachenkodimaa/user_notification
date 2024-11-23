import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { getEnvVariable } from './lib/utils/env';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await runInitMigration(app);

  await app.listen(getEnvVariable('PORT'));
}
bootstrap();

async function runInitMigration(app: INestApplication) {
  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.runMigrations();
}
