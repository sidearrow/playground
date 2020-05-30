import { BaseRepository } from './baseRepository';
import { CompanyOrmEntity } from '../database/entities/companyOrmEntity';
import { CompanyEntity } from '../entities/companyEntity';
import { LineEntity } from '../entities/lineEntity';
import { CompanyStatisticsEntity } from '../entities/companyStatisticsEntity';

export class CompanyRepository extends BaseRepository {
  public async getAll(): Promise<CompanyEntity[]> {
    const con = await this.getConnection();
    const companies = await con.getRepository(CompanyOrmEntity).find();
    const companyEntities = companies.map(
      (company) =>
        new CompanyEntity(
          company.companyId,
          company.companyName,
          company.companyNameAlias,
          company.companyTypeId,
          company.corporateColor,
          company.status
        )
    );

    return companyEntities;
  }

  public async getDetail(companyId: number): Promise<CompanyEntity> {
    const con = await this.getConnection();

    const company = await con.getRepository(CompanyOrmEntity).findOne({
      relations: ['lines', 'companyStatistics'],
      where: { companyId: companyId },
    });

    if (company === undefined) {
      return undefined;
    }

    const companyStatisticsEntities = company.companyStatistics.map(
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

    const companyEntity = new CompanyEntity(
      company.companyId,
      company.companyName,
      company.companyNameAlias,
      company.companyTypeId,
      company.corporateColor,
      company.status,
      null,
      companyStatisticsEntities
    );

    return companyEntity;
  }
}
