import { CompanyStatisticsEntity } from "./company-statistics.entity";

export type CompanyEntity = {
  companyId: number;
  companyCode: string;
  companyName: string;
  companyNameAlias: string;
  companyTypeId: number;
  corporateColor: string | null;

  companyStatistics: CompanyStatisticsEntity[];
};
