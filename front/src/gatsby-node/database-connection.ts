import path from 'path';
import { createConnection } from 'typeorm';

export const getConnection = async () => {
  return await createConnection({
    type: 'mysql',
    host: process.env.GATSBY_DB_HOST || 'localhost',
    port: Number(process.env.GATSBY_DB_PORT),
    username: process.env.GATSBY_DB_USER || 'railway',
    password: process.env.GATSBY_DB_PASS || 'railway',
    database: process.env.GATSBY_DB_NAME || 'railpedia_test',
    entities: [path.join(__dirname, 'database-entities/*.entity.ts')],
    synchronize: false,
  });
};
