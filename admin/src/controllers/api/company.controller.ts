import { Controller, Get } from 'routing-controllers';
import { DB } from '../../database';
import { Company } from '../../entities/company.entity';

@Controller('/api/company')
export class ApiCompanyController {
  @Get('/')
  async getAll(): Promise<Company[]> {
    const connection = await DB.getConnection();
    const companies = await connection.getRepository(Company).find();

    return companies;
  }
}
