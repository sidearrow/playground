import { CompanyStatisticsEntity } from "./company-statistics.entity";
import { LineEntiry } from "./line.entity";

export type CompanyEntity = {
  companyId: number;
  companyCode: string;
  companyName: string;
  companyNameAlias: string;
  companyTypeId: number;
  corporateColor: string | null;

  lines: LineEntiry[];
  companyStatistics: CompanyStatisticsEntity[];
};
