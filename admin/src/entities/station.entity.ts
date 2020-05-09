import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { StationGroupStation } from './station-group-station.entity';
import { Company } from './company.entity';
import { LineStation } from './line-station.entity';

@Entity()
export class Station {
  @PrimaryColumn({ name: 'station_id' })
  stationId: number;

  @Column({ name: 'station_name' })
  stationName: string;

  @Column({ name: 'station_name_kana' })
  stationNameKana: string;

  @OneToOne(
    () => StationGroupStation,
    (stationGroupStation) => stationGroupStation.stationId
  )
  @JoinColumn({ name: 'station_id' })
  stationGroupStation: StationGroupStation;

  @ManyToOne(() => Company, (company) => company.companyId)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => LineStation, t => t.station)
  @JoinColumn({ name: 'station_id' })
  lineStations: LineStation[];
}
