import path from 'path';
import { Company } from '../../database/entities/company.entity';
import { InterfaceCreatePageFunc } from './interface.create-page';

export type LinePageData = {
  companyName: string;
  companyCode: string;
  lines: {
    lineName: string;
    lineCode: string;
  }[];
}[];

export const lineCreatePage: InterfaceCreatePageFunc = async (
  connection,
  { createPage }
) => {
  const records = await connection
    .getRepository(Company)
    .find({ relations: ['lines'] });

  const linePageData: LinePageData = records.map((row) => {
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
    path: 'line',
    component: path.resolve('src/templates/line.template.tsx'),
    context: {
      pageData: linePageData,
    },
  });
};
