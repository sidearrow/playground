import * as express from 'express';
import config, { configInit } from './config';
import { getConnection } from './database';
import { Company, Line } from './entity';
import 'reflect-metadata';

(async () => {
  configInit();
  const connection = await getConnection();

  const app = express();

  app.get('/company', async (_, res) => {
    const companies = await connection.getRepository(Company).find({ relations: ['lines'] });

    return res.json(companies);
  });

  app.get('/line/:lineId', async (req, res) => {
    const lineId = Number(req.params.lineId);
    const line = await connection.getRepository(Line).findOne({
      relations: [
        'lineSections',
        'lineSections.lineSectionStations',
        'lineSections.lineSectionStations.station',
        'lineSections.lineSectionStations.station.stationGroupStation',
        'lineSections.lineSectionStations.station.stationGroupStation.stationGroup',
        'lineSections.lineSectionStations.station.stationGroupStation.stationGroup.stationGroupStations',
        'lineSections.lineSectionStations.station.stationGroupStation.stationGroup.stationGroupStations.station',
      ],
      where: { lineId: lineId },
    });

    return res.json(line);
  });

  app.listen(5000);
})();
