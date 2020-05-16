import { LineStationEntity } from './line-station.entity';
import { StationGroupStationEntity } from './station-group-station.entity';
import { CompanyEntity } from './company.entity';

export type StationEntity = {
  stationId: number;
  stationName: string;
  stationNameKana: string;

  company: CompanyEntity;
  lineStations: LineStationEntity[];
  stationGroupStation: StationGroupStationEntity;
};
