import { Entity, ManyToOne, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { LineEntity } from './line.entity';
import { Station } from './station.entity';
import { LineSectionLineStation } from './line-section-line-station.entity';

@Entity()
export class LineStation {
  @PrimaryColumn({ name: 'line_id' })
  lineId: number;

  @PrimaryColumn({ name: 'station_id' })
  stationId: number;

  @ManyToOne(() => LineEntity, (line) => line.lineId)
  @JoinColumn({ name: 'line_id' })
  line: LineEntity;

  @ManyToOne(() => Station, (station) => station.stationId)
  @JoinColumn({ name: 'station_id' })
  station: Station;

  @OneToMany(() => LineSectionLineStation, t => t.lineStation)
  @JoinColumn([
    { name: 'line_id' },
    { name: 'station_id' },
  ])
  lineSectionLineStations: LineSectionLineStation[];
}
