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
    branchLineName: string | null;
    stationName: string;
    stationNameKana: string;
    length: number;
    lengthBetween: number;
    status: number;
    connectLines: {
      lineName: string;
      lineCode: string;
    }[];
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
