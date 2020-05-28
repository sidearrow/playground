import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from 'src/response-dto/company.response-dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService
  ) { }

  @Get()
  @ApiResponse({ status: 200, type: Company, isArray: true })
  async findAll(): Promise<Company[]> {
    const companies = await this.companyService.findAll()

    const res: Company[] = [];
    companies.map(company => {
      res.push({
        companyId: company.companyId,
        companyCode: company.companyCode,
        companyName: company.companyName,
        companyNameAlias: company.companyNameAlias,
        companyTypeId: company.companyTypeId,
        corporateColor: company.corporateColor,
        status: company.status,
      });
    });

    return res;
  }
}
