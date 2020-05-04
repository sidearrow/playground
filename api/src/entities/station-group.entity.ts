import { Entity, PrimaryColumn, OneToMany } from "typeorm";
import { StationGroupStation } from "./station-group-station.entity";

@Entity()
export class StationGroup {
  @PrimaryColumn({ name: 'station_group_id' })
  stationGroupId: number;

  @OneToMany(() => StationGroupStation, stationGroupStation => stationGroupStation.stationGroup)
  stationGroupStations: StationGroupStation[];
}
