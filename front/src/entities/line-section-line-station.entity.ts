import { StationEntity } from './station.entity';

export type LineSectionLineStationEntity = {
  lineId: number;
  sectionId: number;
  sortNo: number;
  stationId: number;

  station: StationEntity;
};
