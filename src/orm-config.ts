import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  database: 'nest',
  username: 'root',
  password: 'Hanoi!123',
  port: 3306,
  host: '127.0.0.1',
  entities: ['dist/models/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrations: [
    "dist/database/migrations/*.js",
  ],
}

export default config;