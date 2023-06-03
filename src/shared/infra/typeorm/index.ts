import { Company } from 'src/modules/companies/infra/typeorm/entities/Company';
import { Location } from 'src/modules/locations/infra/typeorm/entities/Location';
import { User } from 'src/modules/users/infra/typeorm/entities/User';
import { db_constants } from 'src/shared/config/constants/db_constants';
import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'postgres',
  entities: [User, Company, Location],
  host: db_constants.db_host,
  port: Number(db_constants.db_port),
  username: db_constants.db_username,
  password: db_constants.db_password,
  database: db_constants.db_database,
  migrations: ['dist/shared/infra/typeorm/migrations/*.js'],
});
