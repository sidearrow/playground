import { Controller, Get, Param } from 'routing-controllers';
import { CompanyRepository } from '../../repositories/companyRepository';
import { CompanyEntity } from '../../entities/companyEntity';

@Controller('/api/company')
export class ApiCompanyController {
  @Get('/')
  async getAll(): Promise<CompanyEntity[]> {
    const companyRepository = new CompanyRepository();
    const companies = await companyRepository.getAll();

    return companies;
  }

  @Get('/:companyId')
  async detail(@Param('companyId') companyId: number): Promise<CompanyEntity> {
    const companyRepository = new CompanyRepository();
    const company = await companyRepository.getDetail(companyId);

    return company;
  }
}
