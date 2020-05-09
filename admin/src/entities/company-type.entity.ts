import { Column, PrimaryColumn, Entity } from "typeorm";

@Entity()
export class CompanyType {
  @PrimaryColumn({ name: 'company_type_id' })
  companyTypeId: number;

  @Column({ name: 'company_type_code' })
  companyTypeCode: string;

  @Column({ name: 'company_type_name' })
  companyTypeName: string;
}
