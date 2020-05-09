import { StationEntity } from "./station.entity";
import { StationGroupEntity } from "./station-group.entity";

export class StationGroupStationEntity {
  stationGroupId: number;
  stationId: number;

  station: StationEntity;
  stationGroup: StationGroupEntity;
}
