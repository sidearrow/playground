import { BaseRepository } from './baseRepository';
import { CompanyOrmEntity } from '../database/entities/companyOrmEntity';
import { CompanyEntity } from '../entities/companyEntity';

export class CompanyRepository extends BaseRepository {
  public async getAll(): Promise<CompanyEntity[]> {
    const con = await this.getConnection();
    const companies = await con.getRepository(CompanyOrmEntity).find();
    const companyEntities = companies.map(company => new CompanyEntity(
      company.companyName
    ));

    return companyEntities;
  }
}
