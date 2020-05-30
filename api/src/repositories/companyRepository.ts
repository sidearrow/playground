import { BaseRepository } from './baseRepository';
import { CompanyOrmEntity } from '../database/entities/companyOrmEntity';
import { CompanyEntity } from '../entities/companyEntity';

export class CompanyRepository extends BaseRepository {
  public async getAll(): Promise<CompanyEntity[]> {
    const con = await this.getConnection();
    const companies = await con.getRepository(CompanyOrmEntity).find();
    const companyEntities = companies.map(
      (company): CompanyEntity => ({
        companyId: company.companyId,
        companyName: company.companyName,
        companyNameAlias: company.companyNameAlias,
        companyTypeId: company.companyTypeId,
        corporateColor: company.corporateColor,
        status: company.status,
      })
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

    const companyEntity: CompanyEntity = {
      companyId: company.companyId,
      companyName: company.companyName,
      companyNameAlias: company.companyNameAlias,
      companyTypeId: company.companyTypeId,
      corporateColor: company.corporateColor,
      status: company.status,
    };

    return companyEntity;
  }
}
