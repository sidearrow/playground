import { CompanyEntity } from './companyEntity';
import { LineSectionEntity } from './lineSectionEntity';

export type LineEntity = {
  readonly lineId: number;
  readonly lineCode: string;
  readonly lineName: string;
  readonly lineNameAlias: string;
  readonly lineNameKana: string;
  readonly statusId: number;

  readonly company?: CompanyEntity;
  readonly lineSections?: LineSectionEntity[];
};
