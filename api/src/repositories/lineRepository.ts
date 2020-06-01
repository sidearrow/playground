import { BaseRepository } from './baseRepository';
import { LineEntity } from '../entities/lineEntity';
import { CompanyEntity } from '../entities/companyEntity';
import { LineOrmEntity } from '../database/entities/lineOrmEntity';
import { StationEntity } from '../entities/stationEntity';
import { LineSectionEntity } from '../entities/lineSectionEntity';

export class LineRepository extends BaseRepository {
  public async get(companyId: number = null): Promise<LineEntity[]> {
    const con = await this.getConnection();
    const lines = await con.getRepository(LineOrmEntity).find({
      relations: ['company'],
      where: companyId === null ? {} : { companyId: companyId },
    });

    const lineEntities = lines.map(
      (line): LineEntity => ({
        lineId: line.lineId,
        lineCode: line.lineCode,
        lineName: line.lineName,
        lineNameAlias: line.lineNameAlias,
        lineNameKana: line.lineNameKana,
        statusId: line.statusId,
        company: {
          companyId: line.company.companyId,
          companyCode: line.company.companyCode,
          companyName: line.company.companyName,
          companyNameAlias: line.company.companyNameAlias,
          companyTypeId: line.company.companyTypeId,
          corporateColor: line.company.corporateColor,
          status: line.company.status,
        },
      })
    );

    return lineEntities;
  }

  public async getDetail(lineId: number): Promise<LineEntity> {
    const con = await this.getConnection();
    const line = await con.getRepository(LineOrmEntity).findOne({
      relations: [
        'company',
        'lineSections',
        'lineSections.lineSectionLineStations',
        'lineSections.lineSectionLineStations.station',
        'lineSections.lineSectionLineStations.station.stationGroupStation',
        'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroup',
        'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroup.stationGroupStations',
        'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroup.stationGroupStations.station',
        'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroup.stationGroupStations.station.lineStations',
        'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroup.stationGroupStations.station.lineStations.line',
        'lineSections.lineSectionLineStations.station.stationGroupStation.stationGroup.stationGroupStations.station.company',
      ],
      where: { lineId: lineId },
    });

    const lineSectionEntities: LineSectionEntity[] = line.lineSections.map(
      (ls) => {
        const stationEntities: StationEntity[] = ls.lineSectionLineStations.map(
          (lsls) => {
            let groupStations: StationEntity[] = [];
            if (lsls.station.stationGroupStation !== null) {
              groupStations = lsls.station.stationGroupStation.stationGroup.stationGroupStations.map(
                (sgs) => {
                  const companyEntity: CompanyEntity = {
                    companyId: sgs.station.company.companyId,
                    companyCode: sgs.station.company.companyCode,
                    companyName: sgs.station.company.companyName,
                    companyNameAlias: sgs.station.company.companyNameAlias,
                    companyTypeId: sgs.station.company.companyTypeId,
                    corporateColor: sgs.station.company.corporateColor,
                    status: sgs.station.company.status,
                  };

                  const lineEntities = sgs.station.lineStations.map(
                    (ls): LineEntity => ({
                      lineId: ls.line.lineId,
                      lineCode: ls.line.lineCode,
                      lineName: ls.line.lineName,
                      lineNameAlias: ls.line.lineNameAlias,
                      lineNameKana: ls.line.lineNameKana,
                      statusId: ls.line.statusId,
                    })
                  );

                  return {
                    stationId: sgs.station.stationId,
                    stationName: sgs.station.stationName,
                    stationNameKana: sgs.station.stationNameKana,
                    company: companyEntity,
                    lines: lineEntities,
                  };
                }
              );
            }

            return {
              stationId: lsls.station.stationId,
              stationName: lsls.station.stationName,
              stationNameKana: lsls.station.stationNameKana,
              groupStations: groupStations,
            };
          }
        );

        return {
          lineId: ls.lineId,
          sectionId: ls.sectionId,
          lineSectionName: ls.lineSectionName,
          stations: stationEntities,
        };
      }
    );

    const lineEntity: LineEntity = {
      lineId: line.lineId,
      lineCode: line.lineCode,
      lineName: line.lineName,
      lineNameAlias: line.lineNameAlias,
      lineNameKana: line.lineNameKana,
      statusId: line.statusId,
      company: {
        companyId: line.company.companyId,
        companyCode: line.company.companyCode,
        companyName: line.company.companyName,
        companyNameAlias: line.company.companyNameAlias,
        companyTypeId: line.company.companyTypeId,
        corporateColor: line.company.corporateColor,
        status: line.company.status,
      },
      lineSections: lineSectionEntities,
    };

    return lineEntity;
  }
}
