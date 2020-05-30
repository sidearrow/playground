import { CompanyEntity } from './companyEntity';
import { LineSectionEntity } from './lineSectionEntity';

export class LineEntity {
  constructor(
    public readonly lineId: number,
    public readonly lineCode: string,
    public readonly lineName: string,
    public readonly lineNameAlias: string,
    public readonly lineNameKana: string,
    public readonly statusId: number,
    public readonly company: CompanyEntity | null = null,
    public readonly lineSections: LineSectionEntity[] = []
  ) { }
}
