import { Column, PrimaryColumn, Entity } from 'typeorm';

@Entity({ name: 'company_type' })
export class CompanyTypeOrmEntity {
  @PrimaryColumn({ name: 'company_type_id' })
  companyTypeId: number;

  @Column({ name: 'company_type_code' })
  companyTypeCode: string;

  @Column({ name: 'company_type_name' })
  companyTypeName: string;
}
