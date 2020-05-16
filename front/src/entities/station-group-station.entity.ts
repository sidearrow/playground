import { StationEntity } from './station.entity';
import { StationGroupEntity } from './station-group.entity';

export type StationGroupStationEntity = {
  stationGroupId: number;
  stationId: number;

  station: StationEntity;
  stationGroup: StationGroupEntity;
};
