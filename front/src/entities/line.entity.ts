import { CompanyEntity } from "./company.entity";

export type LineEntiry = {
  lineId: number;
  lineCode: string;
  companyId: number;
  lineName: string;
  lineNameAlias: string;
  lineNameKana: string;
  company: CompanyEntity;
};
