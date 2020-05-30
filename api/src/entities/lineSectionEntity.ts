import { StationEntity } from "./stationEntity";

export class LineSectionEntity {
  constructor(
    public readonly lineId: number,
    public readonly sectionId: number,
    public readonly lineSectionName: string,
    public readonly stations: StationEntity[],
  ) { }
}
