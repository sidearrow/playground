import { LineEntity } from './lineEntity';
import { CompanyStatisticsEntity } from './companyStatisticsEntity';

export class CompanyEntity {
  constructor(
    public readonly companyId: number,
    public readonly companyName: string,
    public readonly companyNameAlias: string,
    public readonly companyTypeId: number,
    public readonly corporateColor: string | null,
    public readonly status: number,
    public readonly lines: LineEntity[] = [],
    public readonly companyStatistics: CompanyStatisticsEntity[] = []
  ) { }
}
