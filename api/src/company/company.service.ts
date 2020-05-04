import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from 'src/entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) { }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find({
      relations: [
        'lines'
      ]
    });
  }
}
