import { LineEntiry } from './line.entity';

export type LineStationEntity = {
  lineId: number;
  stationId: number;

  line: LineEntiry;
};
