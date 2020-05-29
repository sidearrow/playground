import { Controller, Get, Param } from 'routing-controllers';
import { LineOrmEntity } from '../../database/entities/lineOrmEntity';
import { DB } from '../../database/database';

@Controller('/api/line')
export class ApiLineController {
  @Get('/')
  async index(): Promise<LineOrmEntity[]> {
    const con = await DB.getConnection();
    const lines = await con
      .getRepository(LineOrmEntity)
      .find({ relations: ['company'] });

    return lines;
  }

  @Get('/:lineCode')
  async detail(@Param('lineCode') lineCode: string): Promise<LineOrmEntity> {
    const con = await DB.getConnection();
    const line = con.getRepository(LineOrmEntity).findOne({
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

    return line;
  }
}
