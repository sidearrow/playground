import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResponseDto } from './company-response.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Get()
  @ApiOkResponse({
    type: CompanyResponseDto
  })
  findAll(): Promise<CompanyResponseDto[]> {
    return this.companyService.findAll();
  }
}
