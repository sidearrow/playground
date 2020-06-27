export type CompanyEntity = {
  companyId: number;
  companyCode: string;
  companyName: string;
  companyNameAlias: string;
  companyNameKana: string;
  //companyTypeId: number;
  length: number;
  lineNum: number;
  stationNum: number;
  corporateColor: string | null;
  //status: number;
};

export type LineEntity = {
  lineId: number;
  lineCode: string;
  //companyId: number;
  lineName: string;
  lineNameAlias: string;
  lineNameKana: string;
  //statusId: number;
};

export type LineSectionEntity = {
  lineId: number;
  sectionId: number;
  lineSectionName: string | null;
};

export type StationEntity = {
  stationId: number;
  stationName: string;
  stationNameKana: string | null;
  company: CompanyEntity;
  lines: LineEntity;
};

export type StationEntityWithGroupStations = StationEntity & {
  groupStations: StationEntity[];
};

export type RailwayType = {
  railwayTypeId: number;
  railwayTypeCode: string;
  railwayTypeName: string;
};

export type RailwayRailtrackTypes = {
  railwayRailtrackTypeId: number;
  railwayRailtrackTypeCode: string;
  railwayRailtrackTypeName: string;
};
