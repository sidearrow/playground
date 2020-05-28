import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { LineEntity } from "./line.entity";
import { LineSectionLineStation } from "./line-section-line-station.entity";

@Entity()
export class LineSection {
  @PrimaryColumn({ name: 'line_id' })
  lineId: number;

  @PrimaryColumn({ name: 'section_id' })
  sectionId: number;

  @Column({ name: 'line_section_name' })
  lineSectionName: string;

  @ManyToOne(() => LineEntity, line => line.lineSections)
  @JoinColumn({ name: 'line_id' })
  line: LineEntity;

  @OneToMany(() => LineSectionLineStation, t => t.lineSection)
  @JoinColumn([
    { name: 'line_id', referencedColumnName: 'lineId' },
    { name: 'section_id', referencedColumnName: 'sectionId' },
  ])
  lineSectionLineStations: LineSectionLineStation[];
}
