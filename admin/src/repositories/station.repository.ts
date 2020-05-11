import { DB } from '../database';
import { Station } from '../entities/station.entity';
import { Like, FindConditions } from 'typeorm';

export class StationRepository {
  public static async find(stationName: string = null): Promise<Station[]> {
    const con = await DB.getConnection();

    const where: FindConditions<Station> = {};
    if (stationName !== null) {
      where.stationName = Like(`%${stationName}%`);
    }

    const stations = con.getRepository(Station).find({
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
