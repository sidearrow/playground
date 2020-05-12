import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { useExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'tsx');
app.engine('tsx', require('express-react-views').createEngine());

app.use(bodyParser.urlencoded({ extended: true }));

useExpressServer(app, {
  controllers: [path.join(__dirname, 'controllers/**/*.ts')],
});

/*
  app.get('/line', async (_, res) => {
    const lines = await connection
      .getRepository(Line)
      .find({ relations: ['company'] });

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
  */

app.listen(5000);
