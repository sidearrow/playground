import {
  Entity,
  PrimaryColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { StationGroupOrmEntity } from './stationGroupOrmEntity';
import { StationOrmEntity } from './stationOrmEntity';

@Entity({ name: 'station_group_station' })
export class StationGroupStationOrmEntity {
  @PrimaryColumn({ name: 'station_group_id' })
  stationGroupId: number;

  @PrimaryColumn({ name: 'station_id' })
  stationId: number;

  @OneToOne(() => StationOrmEntity, (station) => station.stationId)
  @JoinColumn({ name: 'station_id' })
  station: StationOrmEntity;

  @ManyToOne(() => StationGroupOrmEntity, (stationGroup) => stationGroup.stationGroupId)
  @JoinColumn({ name: 'station_group_id' })
  stationGroup: StationGroupOrmEntity;
}
