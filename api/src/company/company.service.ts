import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { CompanyResponseDto } from './company-response.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) { }

  async findAll(): Promise<CompanyResponseDto[]> {
    const repoRes = await this.companyRepository.find({ relations: ['lines'] });

    return repoRes.map(row => {
      return {
        companyId: row.companyId,
        companyCode: row.companyCode,
        companyName: row.companyName,
        companyNameAlias: row.companyNameAlias,
        lines: row.lines.map(v => {
          return {
            lineId: v.lineId
          }
        })
      };
    });
  }
}
