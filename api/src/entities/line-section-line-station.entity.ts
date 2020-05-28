import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { LineSection } from './line-section.entity';
import { LineStation } from './line-station.entity';
import { Station } from './station.entity';

@Entity()
export class LineSectionLineStation {
  @PrimaryColumn({ name: 'line_id' })
  lineId: number;

  @PrimaryColumn({ name: 'section_id' })
  sectionId: number;

  @PrimaryColumn({ name: 'sort_no' })
  sortNo: number;

  @Column({ name: 'station_id' })
  stationId: number;

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'station_id' })
  station: Station;

  @ManyToOne(() => LineSection, t => t.lineSectionLineStations)
  @JoinColumn([
    { name: 'line_id', referencedColumnName: 'lineId' },
    { name: 'section_id', referencedColumnName: 'sectionId' },
  ])
  lineSection: LineSection;

  @ManyToOne(() => LineStation, t => t.lineSectionLineStations)
  @JoinColumn([{ name: 'line_id', referencedColumnName: 'lineId' }, { name: 'station_id', referencedColumnName: 'stationId' }])
  lineStation: LineStation;
}
