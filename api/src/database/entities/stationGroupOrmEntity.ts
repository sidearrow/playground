import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import { StationGroupStationOrmEntity } from "./stationGroupStationOrmEntity";

@Entity({ name: 'station_group' })
export class StationGroupOrmEntity {
  @PrimaryColumn({ name: 'station_group_id' })
  stationGroupId: number;

  @OneToMany(() => StationGroupStationOrmEntity, stationGroupStation => stationGroupStation.stationGroup)
  stationGroupStations: StationGroupStationOrmEntity[];
}
