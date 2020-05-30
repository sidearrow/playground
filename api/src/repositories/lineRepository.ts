import { BaseRepository } from "./baseRepository";
import { LineEntity } from "../entities/lineEntity";
import { CompanyEntity } from "../entities/companyEntity";
import { LineOrmEntity } from "../database/entities/lineOrmEntity";
import { LineSectionEntity } from "../entities/lineSectionEntity";
import { StationEntity } from "../entities/stationEntity";

export class LineRepository extends BaseRepository {
  public async getAll(): Promise<LineEntity[]> {
    const con = await this.getConnection();
    const lines = await con.getRepository(LineOrmEntity).find({
      relations: ['company']
    });

    const lineEntities = lines.map(line => new LineEntity(
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
        line.company.status,
      ),
    ));

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
      ],
      where: { lineId: lineId }
    });

    const lineSectionEntities = line.lineSections.map(ls => {
      const stationEntities = ls.lineSectionLineStations.map(lsls => {
        return new StationEntity(
          lsls.station.stationId,
          lsls.station.stationName,
          lsls.station.stationNameKana,
        );
      });

      return new LineSectionEntity(
        ls.lineId,
        ls.sectionId,
        ls.lineSectionName,
        stationEntities,
      );
    })

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
        line.company.status,
      ),
      lineSectionEntities,
    );

    return lineEntity;
  }
}
