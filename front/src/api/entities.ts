export type CompanyEntity = {
  companyId: number;
  companyCode: string;
  companyName: string;
  companyNameAlias: string;
  companyTypeId: number;
  corporateColor: string | null;
  status: number;
};

export type CompanyStatisticsEntity = {
  companyId: number;
  year: number;
  transportPassengersTeikiTsukin: number;
  transportPassengersTeikiTsugaku: number;
  transportPassengersTeikiTotal: number;
  transportPassengersTeikiPercent: number;
  transportPassengersTeikigai: number;
  transportPassengersTeikigaiPercent: number;
  transportPassengersSum: number;
  transportRevenuePassengerTeikiTsukin: number;
  transportRevenuePassengerTeikiTsugaku: number;
  transportRevenuePassengerTeikiTotal: number;
  transportRevenuePassengerTeikigai: number;
  transportRevenuePassengerTotal: number;
};

export type LineEntity = {
  lineId: number;
  lineCode: string;
  companyId: number;
  lineName: string;
  lineNameAlias: string;
  lineNameKana: string;
  statusId: number;
};

export type LineSectionEntity = {
  lineId: number;
  sectionId: number;
  lineSectionName: string;
};

export type StationEntity = {
  stationId: number;
  stationName: string;
  stationNameKana: string;
};
