export type ApiResponseCompanyAll = CompanyEntity[];
export type ApiResponseLines = (LineEntity & { company: CompanyEntity })[];
export type ApiResponseLine = LineEntity & {
  company: CompanyEntity;
  lineSections: (LineSectionEntity & {
    stations: (StationEntity & {
      lines: LineEntity[];
      groupStations: StationEntity[];
    })[];
  })[];
};

export type CompanyEntity = {
  companyId: number;
  companyCode: string;
  companyName: string;
  companyNameAlias: string;
  //companyTypeId: number;
  corporateColor: string | null;
  //status: number;
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
