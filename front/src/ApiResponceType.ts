export declare module ApiResponceType {
  export type Company = {
    companyCode: string;
    companyName: string;
    companyTypeName: string;
  };

  export type Line = {
    lineCode: string;
    lineName: string;
  };

  export type CompanyDetail = {
    companyName: string;
    lines: Line[];
  }
}
