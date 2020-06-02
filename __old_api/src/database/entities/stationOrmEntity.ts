import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { StationGroupStationOrmEntity } from './stationGroupStationOrmEntity';
import { CompanyOrmEntity } from './companyOrmEntity';
import { LineStationOrmEntity } from './lineStationOrmEntity';

@Entity({ name: 'station' })
export class StationOrmEntity {
  @PrimaryColumn({ name: 'station_id' })
  stationId: number;

  @Column({ name: 'station_name' })
  stationName: string;

  @Column({ name: 'station_name_kana' })
  stationNameKana: string;

  @OneToOne(
    () => StationGroupStationOrmEntity,
    (stationGroupStation) => stationGroupStation.stationId
  )
  @JoinColumn({ name: 'station_id' })
  stationGroupStation: StationGroupStationOrmEntity;

  @ManyToOne(() => CompanyOrmEntity, (company) => company.companyId)
  @JoinColumn({ name: 'company_id' })
  company: CompanyOrmEntity;

  @OneToMany(() => LineStationOrmEntity, (t) => t.station)
  @JoinColumn({ name: 'station_id' })
  lineStations: LineStationOrmEntity[];
}
