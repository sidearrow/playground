import path from 'path';
import { Company } from '../../database/entities/company.entity';
import { Connection } from 'typeorm';
import { Actions } from 'gatsby';

export type LinePageData = {
  companyName: string;
  companyCode: string;
  lines: {
    lineName: string;
    lineCode: string;
  }[];
}[];

export const lineCreatePage = async (
  connection: Connection,
  { createPage }: Actions
): Promise<void> => {
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
