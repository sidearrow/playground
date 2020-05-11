import { StationGroup } from '../entities/station-group.entity';
import { DB } from '../database';

export class StationGroupRepository {
  public static async getAll(): Promise<StationGroup[]> {
    const con = await DB.getConnection();
    const stationGroups = await con.getRepository(StationGroup).find({
      relations: ['stationGroupStations', 'stationGroupStations.station'],
    });

    return stationGroups;
  }
}
