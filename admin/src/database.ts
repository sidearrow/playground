import path from 'path';
import { createConnection } from 'typeorm';
import config from './config';

export const getConnection = async () => {
  return await createConnection({
    type: 'mysql',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    entities: [
      path.join(__dirname, 'entities/**.ts')
    ],
    synchronize: false,
    logging: true,
  })
};
