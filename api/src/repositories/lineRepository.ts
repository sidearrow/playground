import { BaseRepository } from './baseRepository';
import { LineEntity } from '../entities/lineEntity';
import { CompanyEntity } from '../entities/companyEntity';
import { LineOrmEntity } from '../database/entities/lineOrmEntity';
import { LineSectionEntity } from '../entities/lineSectionEntity';
import { StationEntity } from '../entities/stationEntity';

export class LineRepository extends BaseRepository {
  public async get(companyId: number = null): Promise<LineEntity[]> {
    const con = await this.getConnection();
    const lines = await con.getRepository(LineOrmEntity).find({
      relations: ['company'],
      where: companyId === null ? {} : { companyId: companyId },
    });

    const lineEntities = lines.map(
      (line) =>
        new LineEntity(
          line.lineId,
          line.lineCode,
          line.lineName,
          line.lineNameAlias,
          line.lineNameKana,
          line.statusId,
          new CompanyEntity(
            line.company.companyId,
            line.company.companyName,
            line.company.companyNameAlias,
            line.company.companyTypeId,
            line.company.corporateColor,
            line.company.status
          )
        )
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

    const lineSectionEntities = line.lineSections.map((ls) => {
      const stationEntities = ls.lineSectionLineStations.map((lsls) => {
        let groupStations: StationEntity[] = [];
        if (lsls.station.stationGroupStation !== null) {
          groupStations = lsls.station.stationGroupStation.stationGroup.stationGroupStations.map(
            (sgs) => {
              const companyEntity = new CompanyEntity(
                sgs.station.company.companyId,
                sgs.station.company.companyName,
                sgs.station.company.companyNameAlias,
                sgs.station.company.companyTypeId,
                sgs.station.company.corporateColor,
                sgs.station.company.status
              );

              const lineEntities = sgs.station.lineStations.map(
                (ls) =>
                  new LineEntity(
                    ls.line.lineId,
                    ls.line.lineCode,
                    ls.line.lineName,
                    ls.line.lineNameAlias,
                    ls.line.lineNameKana,
                    ls.line.statusId
                  )
              );

              return new StationEntity(
                sgs.station.stationId,
                sgs.station.stationName,
                sgs.station.stationNameKana,
                [],
                companyEntity,
                lineEntities
              );
            }
          );
        }

        return new StationEntity(
          lsls.station.stationId,
          lsls.station.stationName,
          lsls.station.stationNameKana,
          groupStations
        );
      });

      return new LineSectionEntity(
        ls.lineId,
        ls.sectionId,
        ls.lineSectionName,
        stationEntities
      );
    });

    const lineEntity = new LineEntity(
      line.lineId,
      line.lineCode,
      line.lineName,
      line.lineNameAlias,
      line.lineNameKana,
      line.statusId,
      new CompanyEntity(
        line.company.companyId,
        line.company.companyName,
        line.company.companyNameAlias,
        line.company.companyTypeId,
        line.company.corporateColor,
        line.company.status
      ),
      lineSectionEntities
    );

    return lineEntity;
  }
}
