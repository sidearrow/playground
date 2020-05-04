import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Line } from 'src/entities/line.entity';

@Injectable()
export class LineService {
  constructor(
    @InjectRepository(Line)
    private lineRepository: Repository<Line>
  ) { }

  public find(lineId: string) {
    return this.lineRepository.findOne({
      relations: [
        'lineSections',
        'lineSections.lineSectionStations',
        'lineSections.lineSectionStations.station',
        'lineSections.lineSectionStations.station.stationGroupStation',
        'lineSections.lineSectionStations.station.stationGroupStation.stationGroup',
        'lineSections.lineSectionStations.station.stationGroupStation.stationGroup.stationGroupStations',
        'lineSections.lineSectionStations.station.stationGroupStation.stationGroup.stationGroupStations.station',
      ],
      where: { lineId: lineId }
    });
  }
}
