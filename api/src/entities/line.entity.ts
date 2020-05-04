import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from './company.entity';

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

  /*
  @OneToMany(() => LineSection, lineSection => lineSection.line)
  @JoinColumn({ name: 'line_id' })
  lineSections: LineSection[];
  */

  @ManyToOne(type => Company, company => company.lines)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
