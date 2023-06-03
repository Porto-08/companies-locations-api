import { MigrationInterface, QueryRunner } from 'typeorm';

export class Locations1685816044277 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE locations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                cep VARCHAR(255) NOT NULL,
                street VARCHAR(255) NOT NULL,
                number INTEGER NOT NULL,
                neighborhood VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                state VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now(),
                company_id INTEGER NOT NULL,
                CONSTRAINT fk_company
                    FOREIGN KEY (company_id)
                        REFERENCES companies(id)
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE locations;
        `);
  }
}
