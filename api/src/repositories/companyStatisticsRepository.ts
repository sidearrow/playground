import { CompanyStatisticsEntity } from '../entities/companyStatisticsEntity';
import { BaseRepository } from './baseRepository';
import { CompanyStatisticsOrmEntity } from '../database/entities/companyStatisticsOrmEntity';

export class CompanyStatisticsRepository extends BaseRepository {
  public async getByCompanyId(
    companyId: number
  ): Promise<CompanyStatisticsEntity[]> {
    const con = await this.getConnection();
    const statistics = await con
      .getRepository(CompanyStatisticsOrmEntity)
      .find({ where: { companyId: companyId } });

    const companyStatisticsEntities = statistics.map(
      (v): CompanyStatisticsEntity => ({
        companyId: v.companyId,
        year: v.year,
        transportPassengersTeikiTsukin: v.transportPassengersTeikiTsukin,
        transportPassengersTeikiTsugaku: v.transportPassengersTeikiTsugaku,
        transportPassengersTeikiTotal: v.transportPassengersTeikiTotal,
        transportPassengersTeikiPercent: v.transportPassengersTeikiPercent,
        transportPassengersTeikigai: v.transportPassengersTeikigai,
        transportPassengersTeikigaiPercent:
          v.transportPassengersTeikigaiPercent,
        transportPassengersSum: v.transportPassengersSum,
        transportRevenuePassengerTeikiTsukin:
          v.transportRevenuePassengerTeikiTsukin,
        transportRevenuePassengerTeikiTsugaku:
          v.transportRevenuePassengerTeikiTsugaku,
        transportRevenuePassengerTeikiTotal:
          v.transportRevenuePassengerTeikiTotal,
        transportRevenuePassengerTeikigai: v.transportRevenuePassengerTeikigai,
        transportRevenuePassengerTotal: v.transportRevenuePassengerTotal,
      })
    );

    return companyStatisticsEntities;
  }
}
