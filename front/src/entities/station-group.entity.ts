import { StationGroupStationEntity } from './station-group-station.entity';

export type StationGroupEntity = {
  stationId: number;

  stationGroupStations: StationGroupStationEntity[];
};
