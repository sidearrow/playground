import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class CompanyStatistics {
  @PrimaryColumn({ name: 'company_id' })
  companyId: number;

  @ManyToOne(() => Company, (t) => t.companyStatistics)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @PrimaryColumn({ name: 'year' })
  year: number;

  @Column({ name: 'transport_passengers_teiki_tsukin' })
  transportPassengersTeikiTsukin: number;

  @Column({ name: 'transport_passengers_teiki_tsugaku' })
  transportPassengersTeikiTsugaku: number;

  @Column({ name: 'transport_passengers_teiki_total' })
  transportPassengersTeikiTotal: number;

  @Column({ name: 'transport_passengers_teiki_percent' })
  transportPassengersTeikiPercent: number;

  @Column({ name: 'transport_passengers_teikigai' })
  transportPassengersTeikigai: number;

  @Column({ name: 'transport_passengers_teikigai_percent' })
  transportPassengersTeikigaiPercent: number;

  @Column({ name: 'transport_passengers_sum' })
  transportPassengersSum: number;
}
