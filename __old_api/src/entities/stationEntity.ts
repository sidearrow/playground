import { CompanyEntity } from './companyEntity';
import { LineEntity } from './lineEntity';

export type StationEntity = {
  readonly stationId: number;
  readonly stationName: string;
  readonly stationNameKana: string;

  readonly groupStations?: StationEntity[];
  readonly company?: CompanyEntity;
  readonly lines?: LineEntity[];
};
