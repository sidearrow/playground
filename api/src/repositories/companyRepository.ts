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
        companyCode: company.companyCode,
        companyName: company.companyName,
        companyNameAlias: company.companyNameAlias,
        companyTypeId: company.companyTypeId,
        corporateColor: company.corporateColor,
        status: company.status,
      })
    );

    return companyEntities;
  }

  protected async getDetailBase(
    search: { companyId: number } | { companyCode: string }
  ): Promise<CompanyEntity> {
    const con = await this.getConnection();

    const company = await con.getRepository(CompanyOrmEntity).findOne({
      relations: ['lines', 'companyStatistics'],
      where: search,
    });

    if (company === undefined) {
      return undefined;
    }

    const companyEntity: CompanyEntity = {
      companyId: company.companyId,
      companyCode: company.companyCode,
      companyName: company.companyName,
      companyNameAlias: company.companyNameAlias,
      companyTypeId: company.companyTypeId,
      corporateColor: company.corporateColor,
      status: company.status,
    };

    return companyEntity;
  }

  public async getDetailByCompanyId(companyId: number): Promise<CompanyEntity> {
    return await this.getDetailBase({ companyId: companyId });
  }

  public async getDetailByCompanyCode(
    companyCode: string
  ): Promise<CompanyEntity> {
    return await this.getDetailBase({ companyCode: companyCode });
  }
}
