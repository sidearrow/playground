import express from 'express';
import config, { configInit } from './config';
import { getConnection } from './database';
import 'reflect-metadata';
import { Company } from './entities/company.entity';
import { Line } from './entities/line.entity';

(async () => {
  configInit();

  const connection = await getConnection();

  const app = express();

  app.get('/company', async (_, res) => {
    const companies = await connection.getRepository(Company).find();

    return res.json(companies);
  });

  app.get('/line', async (_, res) => {
    const lines = await connection.getRepository(Line).find({ relations: ['company'] });

    return res.json(lines);
  });

  app.get('/line/:lineCode', async (req, res) => {
    const lineCode = req.params.lineCode;
    const line = await connection.getRepository(Line).findOne({
      relations: [
        'company',
        'lineSections',
        'lineSections.lineSectionLineStations',
        'lineSections.lineSectionLineStations.station',
        'lineSections.lineSectionLineStations.station.lineStations',
        'lineSections.lineSectionLineStations.station.lineStations.line',
        'lineSections.lineSectionLineStations.station.stationGroupStation',
        'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroup',
        'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroup.stationGroupStations',
        'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroup.stationGroupStations.station',
        'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroup.stationGroupStations.station.lineStations',
        'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroup.stationGroupStations.station.lineStations.line',
        'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroup.stationGroupStations.station.company',
      ],
      where: { lineCode: lineCode },
    });

    return res.json(line);
  });

  app.listen(5000);
})();
