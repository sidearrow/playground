import { LineEntity } from './lineEntity';
import { CompanyStatisticsEntity } from './companyStatisticsEntity';

export type CompanyEntity = {
  readonly companyId: number;
  readonly companyName: string;
  readonly companyNameAlias: string;
  readonly companyTypeId: number;
  readonly corporateColor: string | null;
  readonly status: number;

  readonly lines?: LineEntity[];
  readonly companyStatistics?: CompanyStatisticsEntity[];
};
