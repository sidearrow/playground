import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { LineSection } from './line-section.entity';
import { Station } from './station.entity';

@Entity()
export class LineSectionStation {
  @PrimaryColumn({ name: 'line_id' })
  lineId: number;

  @PrimaryColumn({ name: 'section_id' })
  sectionId: number;

  @PrimaryColumn({ name: 'sort_no' })
  sortNo: number;

  @Column({ name: 'station_id' })
  stationId: number;

  @ManyToOne(
    () => LineSection,
    lineSection => lineSection.lineSectionStations
  )
  @JoinColumn([
    { name: 'line_id', referencedColumnName: 'lineId' },
    { name: 'section_id', referencedColumnName: 'sectionId' },
  ])
  lineSection: LineSection;

  @ManyToOne(
    () => Station,
    station => station.stationId
  )
  @JoinColumn({ name: 'station_id' })
  station: Station;
}
