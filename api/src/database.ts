import { createConnection, Connection } from 'typeorm';
import config from './config';
import { Company, Line, LineSection, LineSectionStation, Station, StationGroupStation, StationGroup } from './entity';

export const getConnection = async () => {
  return await createConnection({
    type: 'mysql',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    entities: [Company, Line, LineSection, LineSectionStation, Station, StationGroup, StationGroupStation],
    synchronize: false,
    logging: true,
  })
};
