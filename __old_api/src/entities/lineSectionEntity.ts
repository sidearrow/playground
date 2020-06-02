import { StationEntity } from './stationEntity';

export type LineSectionEntity = {
  readonly lineId: number;
  readonly sectionId: number;
  readonly lineSectionName: string;

  readonly stations: StationEntity[];
};
