export declare module ApiResponceType {
  export type Company = {
    companyCode: string;
    companyName: string;
    companyTypeName?: string;
    length: number;
  };

  export type Line = {
    lineCode: string;
    lineName: string;
  };

  export type Station = {
    stationName: string;
    stationNameKana: string;
    length: number;
    status: number;
  };

  export type CompanyDetail = {
    companyName: string;
    lines: Line[];
  };

  export type LineDetail = {
    company: Company;
    line: Line;
    stations: Station[];
  };
}
