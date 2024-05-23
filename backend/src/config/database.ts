import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../entity/User';

dotenv.config();

export const AppDataSource = new DataSource({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  entities: [User],
  migrations: [],
  subscribers: [],
});
