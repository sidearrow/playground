export class LineEntity {
  constructor(
    public readonly companyId: number,
    public readonly lineName: string,
    public readonly lineNameAlias: string,
    public readonly lineNameKana: string,
    public readonly statusId: number,
  ) { }
}
