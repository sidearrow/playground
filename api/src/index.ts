import * as express from 'express';
import config, { configInit } from './config';
import { getConnection } from './database';
import { Company, Line, LineSection, LineSectionStation } from './entity';
import 'reflect-metadata';

(async () => {
  configInit();
  const connection = await getConnection();

  const app = express();

  app.get('/company', async (_, res) => {
    const companies = await connection.getRepository(Company).find({ relations: ['lines'] });

    return res.json(companies);
  });

  app.get('/line', async (req, res) => {
    const lineRepository = connection.getRepository(Line);
    const data = await lineRepository.find();

    return res.json(data);
  });

  app.get('/line/:lineId', async (req, res) => {
    const lineRepository = connection.getRepository(Line);
    const data = await lineRepository.find({ lineId: Number(req.params.lineId) })

    /*
    const lineSections = await connection.getRepository(LineSection)
      .createQueryBuilder('line_section')
      .leftJoinAndSelect('line_section.lineSectionStations', 'line_section_station')
      .leftJoinAndSelect('line_section_station.station', 'station')
      .where('line_section_station.line_id = :line_id', { line_id: Number(req.params.lineId) })
      .getMany();
      */

    const lineSectionStations = await connection.getRepository(LineSectionStation)
      .createQueryBuilder('LineSectionStation')
      .leftJoinAndSelect('LineSectionStation.station', 'Station')
      .leftJoinAndSelect('Station.stationGroup', 'StationGroupStation')
      //.leftJoinAndSelect('StationGroupStation.groupStations', 'StationGroupStation')
      .where('LineSectionStation.lineId = :line_id', { line_id: Number(req.params.lineId) })
      .getMany();

    return res.json({
      line: data,
      sections: lineSectionStations,
    });
  });

  app.listen(3000);
})();
