import path from 'path';
import { createConnection, Connection } from 'typeorm';
import config from './config';

export const getConnection = async () => {
  return await createConnection({
    type: 'mysql',
    host: config.database.host,
    port: Number(config.database.port),
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    entities: [path.join(__dirname, 'entities/**.ts')],
    synchronize: false,
    logging: true,
  });
};

export class DB {
  private static connection: Connection;

  public static async getConnection(): Promise<Connection> {
    if (DB.connection === null) {
      DB.connection = await createConnection({
        type: 'mysql',
        host: config.database.host,
        port: Number(config.database.port),
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        entities: [path.join(__dirname, 'entities/**.ts')],
        synchronize: false,
        logging: true,
      });
    }

    return DB.connection;
  }
}
