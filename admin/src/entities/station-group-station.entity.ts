import {
  Entity,
  PrimaryColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { StationGroup } from './station-group.entity';
import { Station } from './station.entity';

@Entity()
export class StationGroupStation {
  @PrimaryColumn({ name: 'station_group_id' })
  stationGroupId: number;

  @PrimaryColumn({ name: 'station_id' })
  stationId: number;

  @OneToOne(() => Station, (station) => station.stationId)
  @JoinColumn({ name: 'station_id' })
  station: Station;

  @ManyToOne(() => StationGroup, (stationGroup) => stationGroup.stationGroupId)
  @JoinColumn({ name: 'station_group_id' })
  stationGroup: StationGroup;
}
