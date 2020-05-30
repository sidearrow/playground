import { DB } from '../database/database';
import { StationOrmEntity } from '../database/entities/stationOrmEntity';
import { Like, FindConditions } from 'typeorm';

export class StationRepository {
  public static async find(
    stationName: string = null
  ): Promise<StationOrmEntity[]> {
    const con = await DB.getConnection();

    const where: FindConditions<StationOrmEntity> = {};
    if (stationName !== null) {
      where.stationName = Like(`%${stationName}%`);
    }

    const stations = con.getRepository(StationOrmEntity).find({
      relations: [
        'company',
        'stationGroupStation',
        'stationGroupStation.stationGroup',
        'stationGroupStation.stationGroup.stationGroupStations',
        'stationGroupStation.stationGroup.stationGroupStations.station',
        'stationGroupStation.stationGroup.stationGroupStations.station.company',
      ],
      where: where,
      take: 10,
    });

    return stations;
  }
}
