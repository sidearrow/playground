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
      (v) =>
        new CompanyStatisticsEntity(
          v.companyId,
          v.year,
          v.transportPassengersTeikiTsukin,
          v.transportPassengersTeikiTsugaku,
          v.transportPassengersTeikiTotal,
          v.transportPassengersTeikiPercent,
          v.transportPassengersTeikigai,
          v.transportPassengersTeikigaiPercent,
          v.transportPassengersSum,
          v.transportRevenuePassengerTeikiTsukin,
          v.transportRevenuePassengerTeikiTsugaku,
          v.transportRevenuePassengerTeikiTotal,
          v.transportRevenuePassengerTeikigai,
          v.transportRevenuePassengerTotal
        )
    );

    return companyStatisticsEntities;
  }
}
