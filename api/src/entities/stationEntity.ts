import { CompanyEntity } from "./companyEntity";
import { LineEntity } from "./lineEntity";

export class StationEntity {
  constructor(
    public readonly stationId: number,
    public readonly stationName: string,
    public readonly stationNameKana: string,
    public readonly groupStations: StationEntity[] = [],
    public readonly company: CompanyEntity = null,
    public readonly lines: LineEntity[] = [],
  ) { }
}
