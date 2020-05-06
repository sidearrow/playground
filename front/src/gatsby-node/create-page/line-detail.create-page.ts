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
      /*
      groupStations: {
        stationName: string;
        companyName: string;
      }[];
      */
    }[];
  }[];
};

export const lineDetailCreatePage = async (
  connection: Connection,
  { createPage }: Actions,
  lineId: string
) => {
  const line = await connection.getRepository(Line).findOne({
    relations: [
      'company',
      'lineSections',
      'lineSections.lineSectionStations',
      'lineSections.lineSectionStations.station',
      'lineSections.lineSectionStations.station.stationGroupStation',
      'lineSections.lineSectionStations.station.stationGroupStation.stationGroup',
      'lineSections.lineSectionStations.station.stationGroupStation.stationGroup.stationGroupStations',
      'lineSections.lineSectionStations.station.stationGroupStation.stationGroup.stationGroupStations.station',
    ],
    where: { lineId: lineId },
  });

  if (line === undefined) {
    return;
  }

  const pageData: LineDetailPageData = {
    lineName: line.lineName,
    companyName: line.company.companyName,
    lineSections: line.lineSections.map((lineSection) => {
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
