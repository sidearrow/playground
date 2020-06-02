import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { LineSectionOrmEntity } from './lineSectionOrmEntity';
import { LineStationOrmEntity } from './lineStationOrmEntity';
import { StationOrmEntity } from './stationOrmEntity';

@Entity({ name: 'line_section_line_station' })
export class LineSectionLineStationOrmEntity {
  @PrimaryColumn({ name: 'line_id' })
  lineId: number;

  @PrimaryColumn({ name: 'section_id' })
  sectionId: number;

  @PrimaryColumn({ name: 'sort_no' })
  sortNo: number;

  @Column({ name: 'station_id' })
  stationId: number;

  @ManyToOne(() => StationOrmEntity)
  @JoinColumn({ name: 'station_id' })
  station: StationOrmEntity;

  @ManyToOne(() => LineSectionOrmEntity, (t) => t.lineSectionLineStations)
  @JoinColumn([
    { name: 'line_id', referencedColumnName: 'lineId' },
    { name: 'section_id', referencedColumnName: 'sectionId' },
  ])
  lineSection: LineSectionOrmEntity;

  @ManyToOne(() => LineStationOrmEntity, (t) => t.lineSectionLineStations)
  @JoinColumn([
    { name: 'line_id', referencedColumnName: 'lineId' },
    { name: 'station_id', referencedColumnName: 'stationId' },
  ])
  lineStation: LineStationOrmEntity;
}
