import * as dotenv from 'dotenv';

const config = {
  database: {
    host: null,
    port: null,
    database: null,
    username: null,
    password: null,
  }
}

export const configInit = () => {
  dotenv.config();

  config.database.host = process.env.DB_HOST;
  config.database.port = process.env.DB_PORT;
  config.database.database = process.env.DB_NAME;
  config.database.username = process.env.DB_USER;
  config.database.password = process.env.DB_PASS;
}

export default config;
