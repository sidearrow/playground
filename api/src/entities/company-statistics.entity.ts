import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Entity()
export class CompanyStatistics {
  @PrimaryColumn({ name: 'company_id' })
  companyId: number;

  @ManyToOne(() => CompanyEntity, (t) => t.companyStatistics)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

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

  @Column({ name: 'transport_revenue_passenger_teiki_tsukin' })
  transportRevenuePassengerTeikiTsukin: number;

  @Column({ name: 'transport_revenue_passenger_teiki_tsugaku' })
  transportRevenuePassengerTeikiTsugaku: number;

  @Column({ name: 'transport_revenue_passenger_teiki_total' })
  transportRevenuePassengerTeikiTotal: number;

  @Column({ name: 'transport_revenue_passenger_teikigai' })
  transportRevenuePassengerTeikigai: number;

  @Column({ name: 'transport_revenue_passenger_total' })
  transportRevenuePassengerTotal: number;
}
