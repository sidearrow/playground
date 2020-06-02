import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { LineOrmEntity } from './lineOrmEntity';
import { LineSectionLineStationOrmEntity } from './lineSectionLineStationOrmEntity';

@Entity({ name: 'line_section' })
export class LineSectionOrmEntity {
  @PrimaryColumn({ name: 'line_id' })
  lineId: number;

  @PrimaryColumn({ name: 'section_id' })
  sectionId: number;

  @Column({ name: 'line_section_name' })
  lineSectionName: string;

  @ManyToOne(() => LineOrmEntity, (line) => line.lineSections)
  @JoinColumn({ name: 'line_id' })
  line: LineOrmEntity;

  @OneToMany(() => LineSectionLineStationOrmEntity, (t) => t.lineSection)
  @JoinColumn([
    { name: 'line_id', referencedColumnName: 'lineId' },
    { name: 'section_id', referencedColumnName: 'sectionId' },
  ])
  lineSectionLineStations: LineSectionLineStationOrmEntity[];
}
