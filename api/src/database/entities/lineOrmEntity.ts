import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { LineSectionOrmEntity } from './lineSectionOrmEntity';
import { CompanyOrmEntity } from './companyOrmEntity';
import { LineStationOrmEntity } from './lineStationOrmEntity';

@Entity({ name: 'line' })
export class LineOrmEntity {
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

  @Column({ name: 'status_id' })
  statusId: number;

  @OneToMany(() => LineStationOrmEntity, (t) => t.line)
  @JoinColumn({ name: 'line_id' })
  lineStations: LineStationOrmEntity[];

  @OneToMany(() => LineSectionOrmEntity, (lineSection) => lineSection.line)
  @JoinColumn({ name: 'line_id' })
  lineSections: LineSectionOrmEntity[];

  @ManyToOne(() => CompanyOrmEntity, (company) => company.lines)
  @JoinColumn({ name: 'company_id' })
  company: CompanyOrmEntity;
}
