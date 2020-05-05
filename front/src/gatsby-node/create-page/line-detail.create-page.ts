import path from 'path';
import { InterfaceCreatePageFunc } from './interface.create-page';
import { Connection } from 'typeorm';
import { Actions } from 'gatsby';
import { Line } from '../../database/entities/line.entity';

export type LineDetailPageData = {
  lineName: string;
  companyName: string;
  lineSections: {
    lineSectionName: string;
    stations: {
      stationName: string;
    }[];
  }[];
};

export const lineDetailCreatePage = async (
  connection: Connection,
  { createPage }: Actions,
  lineId: string
) => {
  const records = await connection.getRepository(Line).findOne({
    relations: [
      'lineSections',
      'lineSections.lineSectionStations',
      'lineSections.lineSectionStations.station',
    ],
    where: { lineId: lineId },
  });

  if (records === undefined) {
    return;
  }

  const pageData: LineDetailPageData = {
    lineName: records.lineName,
    companyName: '',
    lineSections: records.lineSections.map((lineSection) => {
      return {
        lineSectionName: lineSection.lineSectionName,
        stations: lineSection.lineSectionStations.map((v) => {
          return {
            stationName: v.station.stationName,
          };
        }),
      };
    }),
  };

  createPage({
    path: `line/${records.lineCode}`,
    component: path.resolve('src/templates/line-detail.template.tsx'),
    context: {
      pageData: pageData,
    },
  });
};

export const getAllLineId = async (
  connection: Connection
): Promise<string[]> => {
  const dbData: { line_id: string }[] = await connection.query(
    'select line_id from line'
  );

  return dbData.map((row) => row.line_id);
};
