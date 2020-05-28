import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Line } from './line.entity';
import { CompanyStatistics } from './company-statistics.entity';

@Entity()
export class Company {
  @PrimaryColumn({ name: 'company_id' })
  companyId: number;

  @Column({ name: 'company_code' })
  companyCode: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'company_name_alias' })
  companyNameAlias: string;

  @Column({ name: 'company_type_id' })
  companyTypeId: number;

  @Column({ name: 'corporate_color' })
  corporateColor: string | null;

  @Column({ name: 'status' })
  status: number;

  @OneToMany(() => Line, (line) => line.company)
  @JoinColumn({ name: 'company_id' })
  lines: Line[];

  @OneToMany(() => CompanyStatistics, (t) => t.company)
  @JoinColumn({ name: 'company_id' })
  companyStatistics: CompanyStatistics[];
}
