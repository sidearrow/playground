import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Line } from "./line.entity";
import { LineSectionStation } from "./line-section-station.entity";

@Entity()
export class LineSection {
  @PrimaryColumn({ name: 'line_id' })
  lineId: number;

  @PrimaryColumn({ name: 'section_id' })
  sectionId: number;

  @Column({ name: 'line_section_name' })
  lineSectionName: string;

  @ManyToOne(() => Line, line => line.lineSections)
  @JoinColumn({ name: 'line_id' })
  line: Line;

  @OneToMany(() => LineSectionStation, lineSectionStation => lineSectionStation.lineSection)
  @JoinColumn([
    { name: 'line_id', referencedColumnName: 'lineId' },
    { name: 'section_id', referencedColumnName: 'sectionId' },
  ])
  lineSectionStations: LineSectionStation[];
}
