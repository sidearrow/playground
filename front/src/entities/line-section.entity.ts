import { LineSectionLineStationEntity } from "./line-section-line-station.entity";

export class LineSectionEntity {
  lineId: number;
  sectionId: number;
  lineSectionName: string;

  lineSectionLineStations: LineSectionLineStationEntity[];
}
