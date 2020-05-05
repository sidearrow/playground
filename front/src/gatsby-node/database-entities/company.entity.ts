import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { Line } from './line.entity';

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

  @OneToMany(
    type => Line,
    line => line.company
  )
  @JoinColumn({ name: 'company_id' })
  lines: Line[];
}
