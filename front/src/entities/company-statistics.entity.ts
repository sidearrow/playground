import { CompanyEntity } from './company.entity';

export type CompanyStatisticsEntity = {
  companyId: number;
  company: CompanyEntity;
  year: number;
  transportPassengersTeikiTsukin: number;
  transportPassengersTeikiTsugaku: number;
  transportPassengersTeikiTotal: number;
  transportPassengersTeikiPercent: number;
  transportPassengersTeikigai: number;
  transportPassengersTeikigaiPercent: number;
  transportPassengersSum: number;
};
