import * as dotenv from 'dotenv';

const config = {
  dbHost: null,
  dbPort: null,
  dbName: null,
  dbUser: null,
  dbPass: null,
}

export const configInit = () => {
  dotenv.config();

  config.dbHost = process.env.DB_HOST;
  config.dbPort = process.env.DB_PORT;
  config.dbName = process.env.DB_NAME;
  config.dbUser = process.env.DB_USER;
  config.dbPass = process.env.DB_PASS;
}

export default config;
