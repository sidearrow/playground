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
    const companies = await connection.getRepository(Company).find({ relations: ['lines'] });

    return res.json(companies);
  });

  app.get('/line/:lineId', async (req, res) => {
    const lineId = Number(req.params.lineId);
    const line = await connection.getRepository(Line).findOne({
      relations: [
        'company',
        'lineSections',
        'lineSections.lineSectionLineStations',
        'lineSections.lineSectionLineStations.lineStation',
        'lineSections.lineSectionLineStations.lineStation.station',
        'lineSections.lineSectionLineStations.lineStation.station.stationGroupStation',
        'lineSections.lineSectionLineStations.lineStation.station.stationGroupStation.stationGroup',
        'lineSections.lineSectionLineStations.lineStation.station.stationGroupStation.stationGroup.stationGroupStations',
        'lineSections.lineSectionLineStations.lineStation.station.stationGroupStation.stationGroup.stationGroupStations.station',
        'lineSections.lineSectionLineStations.lineStation.station.stationGroupStation.stationGroup.stationGroupStations.station.lineStations',
        'lineSections.lineSectionLineStations.lineStation.station.stationGroupStation.stationGroup.stationGroupStations.station.lineStations.line',
        'lineSections.lineSectionLineStations.lineStation.station.stationGroupStation.stationGroup.stationGroupStations.station.company',
        //'lineSections.lineSectionLineStations.lineStation.station.stationGroup.stationGroupStations',
      ],
      where: { lineId: lineId },
    });

    return res.json(line);
  });

  app.listen(5000);
})();
