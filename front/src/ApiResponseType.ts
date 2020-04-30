export interface ResponseTypeCompany {
  companyId: number;
  companyCode: string;
  companyName: string;
  companyNameAlias: string;
  lines: Line[];
}

interface Line {
  lineId: number;
  lineCode: string;
  companyId: number;
  lineName: string;
  lineNameAlias: string;
  lineNameKana: string;
}

export interface ResponseTypeLineDetail {
  lineId: number;
  lineCode: string;
  companyId: number;
  lineName: string;
  lineNameAlias: string;
  lineNameKana: string;
  lineSections: LineSection[];
}

interface LineSection {
  lineId: number;
  sectionId: number;
  lineSectionName: string;
  lineSectionStations: LineSectionStation[];
}

interface LineSectionStation {
  lineId: number;
  sectionId: number;
  sortNo: number;
  stationId: number;
  station: LineSectionStationStation;
}

interface LineSectionStationStation {
  stationId: number;
  stationName: string;
  stationGroupStation: StationStationGroupStation | null;
}

interface StationStationGroupStation {
  stationGroupId: number;
  stationId: number;
  stationGroup: StationGroup;
}

interface StationGroup {
  stationGroupId: number;
  stationGroupStations: StationGroupStationElement[];
}

interface StationGroupStationElement {
  stationGroupId: number;
  stationId: number;
  station: StationGroupStationStation;
}

interface StationGroupStationStation {
  stationId: number;
  stationName: string;
}
