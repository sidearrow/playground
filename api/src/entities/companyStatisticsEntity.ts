export class CompanyStatisticsEntity {
  constructor(
    public readonly companyId: number,
    public readonly yaer: number,
    public readonly transportPassengersTeikiTsukin: number,
    public readonly transportPassengersTeikiTsugaku: number,
    public readonly transportPassengersTeikiTotal: number,
    public readonly transportPassengersTeikiPercent: number,
    public readonly transportPassengersTeikigai: number,
    public readonly transportPassengersTeikigaiPercent: number,
    public readonly transportPassengersSum: number,
    public readonly transportRevenuePassengerTeikiTsukin: number,
    public readonly transportRevenuePassengerTeikiTsugaku: number,
    public readonly transportRevenuePassengerTeikiTotal: number,
    public readonly transportRevenuePassengerTeikigai: number,
    public readonly transportRevenuePassengerTotal: number,
  ) { }
}
