import { Controller, Get, Param } from 'routing-controllers';
import { DB } from '../../database/database';
import { CompanyOrmEntity } from '../../database/entities/companyOrmEntity';
import { CompanyRepository } from '../../repositories/companyRepository';
import { CompanyEntity } from '../../entities/companyEntity';

@Controller('/api/company')
export class ApiCompanyController {
  @Get('/')
  async getAll(): Promise<CompanyEntity[]> {
    const companyRepository = new CompanyRepository;
    const companies = await companyRepository.getAll();

    return companies;
  }

  @Get('/:companyCode')
  async detail(@Param('companyCode') companyCode: string): Promise<CompanyOrmEntity> {
    const connection = await DB.getConnection();
    const company = await connection.getRepository(CompanyOrmEntity).findOne({
      relations: ['lines', 'companyStatistics'],
      where: {
        companyCode: companyCode,
      },
    });

    return company;
  }
}
