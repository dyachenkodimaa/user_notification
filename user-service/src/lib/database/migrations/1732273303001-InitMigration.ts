import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitMigration1732273303001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'uuid',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar(255)',
            isUnique: false,
            isNullable: false,
          },
          {
            name: 'surname',
            type: 'varchar(255)',
            isUnique: false,
            isNullable: false,
          },
          {
            name: 'add_time',
            type: 'varchar(255)',
            isUnique: false,
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
  }
}
