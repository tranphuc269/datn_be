// const defaultDataSource = {
//   type: 'mysql',
//   database: 'nest',
//   username: 'root',
//   password: 'Hanoi!123',
//   port: 3306,
//   host: '127.0.0.1',
//   entities: [__dirname + 'src/models/**/*.entity{.ts,.js}'],
//   synchronize: false,
//   dropSchema: false,
//   migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
// };

const defaultDataSource = {
  type: 'mysql',
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  port: Number(process.env.PORT),
  host: process.env.HOST,
  entities: [__dirname + 'src/models/entities/*.entity{.ts,.js}'],
  synchronize: false,
  migration: [__dirname + '/src/migrations/*{.ts,.js}'],
};

export default defaultDataSource;
