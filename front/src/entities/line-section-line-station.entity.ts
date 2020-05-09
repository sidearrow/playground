import { StationEntity } from "./station.entity";

export class LineSectionLineStationEntity {
  lineId: number;
  sectionId: number;
  sortNo: number;
  stationId: number;

  station: StationEntity;
}
