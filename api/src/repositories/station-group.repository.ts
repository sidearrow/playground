import { DB } from '../database/database';
import { StationGroupOrmEntity } from '../database/entities/stationGroupOrmEntity';
import { StationGroupStationOrmEntity } from '../database/entities/stationGroupStationOrmEntity';
import { StationOrmEntity } from '../database/entities/stationOrmEntity';
import { Like, In } from 'typeorm';

export class StationGroupRepository {
  public static async create(stationId: number): Promise<void> {
    const con = await DB.getConnection();
    const qr = con.createQueryRunner();

    await qr.startTransaction();

    try {
      const stationGroupInsertRes = await con
        .getRepository(StationGroupOrmEntity)
        .insert({});

      const stationGroupId = stationGroupInsertRes.raw.insertId;

      await con.getRepository(StationGroupStationOrmEntity).insert({
        stationGroupId: stationGroupId,
        stationId: stationId,
      });

      await qr.commitTransaction();
    } catch (e) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }

  public static async add(
    stationGroupId: number,
    stationId: number
  ): Promise<void> {
    const con = await DB.getConnection();
    const qr = con.createQueryRunner();

    await qr.startTransaction();

    try {
      await con.getRepository(StationGroupStationOrmEntity).insert({
        stationGroupId: stationGroupId,
        stationId: stationId,
      });
      await qr.commitTransaction();
    } catch (e) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }

  public static async delete(
    stationGroupId: number,
    stationId: number
  ): Promise<void> {
    const con = await DB.getConnection();
    const qr = con.createQueryRunner();

    await qr.startTransaction();

    try {
      await con.getRepository(StationGroupStationOrmEntity).delete({
        stationGroupId: stationGroupId,
        stationId: stationId,
      });
      await qr.commitTransaction();
    } catch (e) {
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }

  public static async find(stationName: string): Promise<StationGroupOrmEntity[]> {
    const con = await DB.getConnection();

    const stations = await con.getRepository(StationOrmEntity).find({
      relations: ['stationGroupStation'],
      where: {
        stationName: Like(`%${stationName}%`),
      },
    });

    const stationGroupIds = [
      ...new Set(
        stations
          .filter((v) => v.stationGroupStation !== null)
          .map((v) => v.stationGroupStation.stationGroupId)
      ),
    ];

    if (stationGroupIds.length === 0) {
      return [];
    }

    const stationGroups = await con.getRepository(StationGroupOrmEntity).find({
      relations: [
        'stationGroupStations',
        'stationGroupStations.station',
        'stationGroupStations.station.company',
      ],
      where: {
        stationGroupId: In(stationGroupIds),
      },
    });

    return stationGroups;
  }
}
