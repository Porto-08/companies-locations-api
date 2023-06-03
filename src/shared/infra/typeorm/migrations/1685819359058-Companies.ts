import { MigrationInterface, QueryRunner } from 'typeorm';

export class Companies1685816044276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE companies (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                website VARCHAR(255) NOT NULL,
                cnpj VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                user_id INTEGER NOT NULL,
                CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE companies;
        `);
  }
}
