import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { StationGroupStation } from "./station-group-station.entity";

@Entity()
export class Station {
  @PrimaryColumn({ name: 'station_id' })
  stationId: number;

  @Column({ name: 'station_name' })
  stationName: string;

  @OneToOne(() => StationGroupStation, stationGroupStation => stationGroupStation.stationId)
  @JoinColumn({ name: 'station_id' })
  stationGroupStation: StationGroupStation;
}
