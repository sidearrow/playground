import { CompanyEntity } from './company.entity';
import { LineSectionEntity } from './line-section.entity';

export type LineEntiry = {
  lineId: number;
  lineCode: string;
  companyId: number;
  lineName: string;
  lineNameAlias: string;
  lineNameKana: string;
  statusId: number;

  company: CompanyEntity;
  lineSections: LineSectionEntity[];
};
