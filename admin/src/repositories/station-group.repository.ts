import { DB } from '../database';
import { StationGroup } from '../entities/station-group.entity';
import { StationGroupStation } from '../entities/station-group-station.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class StationGroupRepository {
  public static async create(stationIds: number[]): Promise<void> {
    const con = await DB.getConnection();
    const qr = con.createQueryRunner();

    await qr.startTransaction();

    try {
      const stationGroupInsertRes = await con
        .getRepository(StationGroup)
        .insert({});

      const stationGroupId = stationGroupInsertRes.identifiers[0].id;

      const stationGroupStations: QueryDeepPartialEntity<
        StationGroupStation
      >[] = stationIds.map((stationId) => {
        return {
          stationGroupId: stationGroupId,
          stationId: stationId,
        };
      });

      await con.getRepository(StationGroupStation).insert(stationGroupStations);

      await qr.commitTransaction();
    } catch (e) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }

  public static async find(): Promise<StationGroup[]> {
    const con = await DB.getConnection();

    const stationGroups = await con.getRepository(StationGroup).find({
      relations: [
        'stationGroupStations',
        'stationGroupStations.station',
        'stationGroupStations.station.company',
      ],
      take: 20,
    });

    return stationGroups;
  }
}
