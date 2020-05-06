import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { LineSection } from './line-section.entity';
import { Company } from './company.entity';
import { LineStation } from './line-station.entity';

@Entity()
export class Line {
  @PrimaryColumn({ name: 'line_id' })
  lineId: number;

  @Column({ name: 'line_code' })
  lineCode: string;

  @Column({ name: 'company_id' })
  companyId: string;

  @Column({ name: 'line_name' })
  lineName: string;

  @Column({ name: 'line_name_alias' })
  lineNameAlias: string;

  @Column({ name: 'line_name_kana' })
  lineNameKana: string;

  @OneToMany(() => LineStation, (t) => t.line)
  @JoinColumn({ name: 'line_id' })
  lineStations: LineStation[];

  @OneToMany(() => LineSection, (lineSection) => lineSection.line)
  @JoinColumn({ name: 'line_id' })
  lineSections: LineSection[];

  @ManyToOne(() => Company, (company) => company.lines)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
