import { Controller, Get, Param } from 'routing-controllers';
import { LineOrmEntity } from '../../database/entities/lineOrmEntity';
import { DB } from '../../database/database';
import { LineRepository } from '../../repositories/lineRepository';
import { LineEntity } from '../../entities/lineEntity';

@Controller('/api/line')
export class ApiLineController {
  @Get('/')
  async index(): Promise<LineEntity[]> {
    const lineRepository = new LineRepository;
    const lines = await lineRepository.getAll();

    return lines;
  }

  @Get('/:lineId')
  async detail(@Param('lineId') lineId: number): Promise<LineEntity> {
    const lineRepository = new LineRepository;
    const line = await lineRepository.getDetail(lineId);

    return line;
    /*
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
    */
  }
}
