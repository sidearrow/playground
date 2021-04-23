export type ApiResponseCompanies = (CompanyEntity & {
  companyType: CompanyTypeEntity;
  railwayTypes: RailwayTypeEntity[];
  railwayRailtrackTypes: RailwayRailtrackTypeEntity[];
})[];

export type ApiResponseLines = (LineEntity & { company: CompanyEntity })[];

export type ApiResponseLine = LineEntity & {
  company: CompanyEntity;
  lineSections: (LineSectionEntity & {
    stations: (StationEntity & {
      lines: LineEntity[];
      groupStations: (StationEntity & {
        company: CompanyEntity;
        lines: LineEntity[];
      })[];
    })[];
  })[];
};

export type CompanyEntity = {
  companyId: number;
  companyCode: string;
  companyName: string;
  companyNameAlias: string;
  companyNameKana: string;
  length: number;
  lineNum: number;
  stationNum: number;
  corporateColor: string | null;
};

export type CompanyTypeEntity = {
  companyTypeId: number;
  companyTypeCode: string;
  companyTypeName: string;
};

export type RailwayTypeEntity = {
  railwayTypeId: number;
  railwayTypeCode: string;
  railwayTypeName: string;
};

export type RailwayRailtrackTypeEntity = {
  railwayRailtrackTypeId: number;
  railwayRailtrackTypeCode: string;
  railwayRailtrackTypeName: string;
};

export type CompanyStatisticsEntity = {
  companyId: number;
  year: number;
  transportPassengersTeikiTsukin: number | null;
  transportPassengersTeikiTsugaku: number | null;
  transportPassengersTeikiTotal: number | null;
  transportPassengersTeikiPercent: number | null;
  transportPassengersTeikigai: number | null;
  transportPassengersTeikigaiPercent: number | null;
  transportPassengersTotal: number | null;
  transportRevenuePassengerTeikiTsukin: number | null;
  transportRevenuePassengerTeikiTsugaku: number | null;
  transportRevenuePassengerTeikiTotal: number | null;
  transportRevenuePassengerTeikigai: number | null;
  transportRevenuePassengerTotal: number | null;
};

export type LinesEntity = LineEntity[];

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
};
