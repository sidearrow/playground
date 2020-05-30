import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { LineOrmEntity } from './lineOrmEntity';
import { StationOrmEntity } from './stationOrmEntity';
import { LineSectionLineStationOrmEntity } from './lineSectionLineStationOrmEntity';

@Entity({ name: 'line_station' })
export class LineStationOrmEntity {
  @PrimaryColumn({ name: 'line_id' })
  lineId: number;

  @PrimaryColumn({ name: 'station_id' })
  stationId: number;

  @ManyToOne(() => LineOrmEntity, (line) => line.lineId)
  @JoinColumn({ name: 'line_id' })
  line: LineOrmEntity;

  @ManyToOne(() => StationOrmEntity, (station) => station.stationId)
  @JoinColumn({ name: 'station_id' })
  station: StationOrmEntity;

  @OneToMany(() => LineSectionLineStationOrmEntity, (t) => t.lineStation)
  @JoinColumn([{ name: 'line_id' }, { name: 'station_id' }])
  lineSectionLineStations: LineSectionLineStationOrmEntity[];
}
