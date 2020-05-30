export type CompanyStatisticsEntity = {
  readonly companyId: number;
  readonly year: number;
  readonly transportPassengersTeikiTsukin: number;
  readonly transportPassengersTeikiTsugaku: number;
  readonly transportPassengersTeikiTotal: number;
  readonly transportPassengersTeikiPercent: number;
  readonly transportPassengersTeikigai: number;
  readonly transportPassengersTeikigaiPercent: number;
  readonly transportPassengersSum: number;
  readonly transportRevenuePassengerTeikiTsukin: number;
  readonly transportRevenuePassengerTeikiTsugaku: number;
  readonly transportRevenuePassengerTeikiTotal: number;
  readonly transportRevenuePassengerTeikigai: number;
  readonly transportRevenuePassengerTotal: number;
};
