import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiResponse } from '@nestjs/swagger';
import { CompanyFindAllResponseDto, CompanyFindResponseDto } from './company.reponse.dto';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService
  ) { }

  @Get()
  @ApiResponse({ status: 200, type: CompanyFindAllResponseDto, isArray: true })
  async findAll(): Promise<CompanyFindAllResponseDto[]> {
    const companies = await this.companyService.findAll()

    const res = companies.map(company => CompanyFindAllResponseDto.createFromEntity(company));

    return res;
  }

  @Get('/:companyId')
  @ApiResponse({ status: 200, type: CompanyFindResponseDto })
  async find(@Param('companyId') companyId): Promise<CompanyFindResponseDto> {
    const company = await this.companyService.find(companyId)

    if (company === undefined) {
      throw new NotFoundException();
    }

    return CompanyFindResponseDto.mappingFromEntity(company);
  }
}
