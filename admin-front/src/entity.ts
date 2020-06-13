export type CompanyEntity = {
  companyId: number;
  companyCode: string;
  companyName: string;
  companyNameAlias: string;
  //companyTypeId: number;
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
};
