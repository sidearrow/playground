import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>
  ) { }

  find(companyId: number): Promise<CompanyEntity> {
    return this.companyRepository.findOne({
      where: { companyId: companyId },
      relations: ['lines']
    });
  }

  findAll(): Promise<CompanyEntity[]> {
    return this.companyRepository.find();
  }
}
