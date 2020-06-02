import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { LineOrmEntity } from './lineOrmEntity';
import { CompanyStatisticsOrmEntity } from './companyStatisticsOrmEntity';

@Entity({ name: 'company' })
export class CompanyOrmEntity {
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

  @OneToMany(() => LineOrmEntity, (line) => line.company)
  @JoinColumn({ name: 'company_id' })
  lines: LineOrmEntity[];

  @OneToMany(() => CompanyStatisticsOrmEntity, (t) => t.company)
  @JoinColumn({ name: 'company_id' })
  companyStatistics: CompanyStatisticsOrmEntity[];
}
