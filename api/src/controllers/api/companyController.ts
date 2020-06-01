import { Controller, Get, Param } from 'routing-controllers';
import { CompanyRepository } from '../../repositories/companyRepository';
import { CompanyEntity } from '../../entities/companyEntity';
import { CompanyStatisticsEntity } from '../../entities/companyStatisticsEntity';
import { CompanyStatisticsRepository } from '../../repositories/companyStatisticsRepository';

@Controller('/api/company')
export class ApiCompanyController {
  constructor(private companyRepository = new CompanyRepository()) { }

  @Get('/')
  async getAll(): Promise<CompanyEntity[]> {
    const companyRepository = new CompanyRepository();
    const companies = await companyRepository.getAll();

    return companies;
  }

  @Get('/code=:companyCode')
  async getDetailByCompanyCode(
    @Param('companyCode') companyCode: string
  ): Promise<CompanyEntity> {
    return await this.companyRepository.getDetailByCompanyCode(companyCode);
  }

  @Get('/:companyId')
  async getDetail(
    @Param('companyId') companyId: number
  ): Promise<CompanyEntity> {
    return await this.companyRepository.getDetailByCompanyId(companyId);
  }

  @Get('/:companyId/statistics')
  async getStatistics(
    @Param('companyId') companyId: number
  ): Promise<CompanyStatisticsEntity[]> {
    const companyStatisticsRepository = new CompanyStatisticsRepository();
    const statistics = await companyStatisticsRepository.getByCompanyId(
      companyId
    );

    return statistics;
  }
}
