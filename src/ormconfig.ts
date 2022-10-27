import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const defaultDataSource = new DataSource({
  type: 'mysql',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  entities: [__dirname + '/src/models/entities/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
});
export default defaultDataSource;
