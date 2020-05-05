import path from 'path';
import { Company } from '../../database/entities/company.entity';
import { Connection } from 'typeorm';
import { Actions } from 'gatsby';

export type CompanyPageData = {
  companyName: string;
  companyCode: string;
  lines: {
    lineName: string;
    lineCode: string;
  }[];
}[];

const CompanyCreatePage = async (
  connection: Connection,
  { createPage }: Actions
): Promise<void> => {
  const records = await connection
    .getRepository(Company)
    .find({ relations: ['lines'] });

  const companyPageData: CompanyPageData = records.map((row) => {
    return {
      companyName: row.companyNameAlias,
      companyCode: row.companyCode,
      lines: row.lines.map((v) => {
        return {
          lineName: v.lineName,
          lineCode: v.lineCode,
        };
      }),
    };
  });

  createPage({
    path: 'company',
    component: path.resolve('src/templates/company.template.tsx'),
    context: {
      pageData: companyPageData,
    },
  });
};

export default CompanyCreatePage;
