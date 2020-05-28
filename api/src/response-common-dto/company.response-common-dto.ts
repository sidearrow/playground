import { ApiProperty } from '@nestjs/swagger'
import { CompanyEntity } from 'src/entities/company.entity';

export class CompanyResponseDto {
  @ApiProperty()
  companyId: number;

  @ApiProperty()
  companyCode: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  companyNameAlias: string;

  @ApiProperty()
  companyTypeId: number;

  @ApiProperty()
  corporateColor: string;

  @ApiProperty()
  status: number;

  static createFromEntity(entity: CompanyEntity): CompanyResponseDto {
    return {
      companyId: entity.companyId,
      companyCode: entity.companyCode,
      companyName: entity.companyName,
      companyNameAlias: entity.companyNameAlias,
      companyTypeId: entity.companyTypeId,
      corporateColor: entity.corporateColor,
      status: entity.status,
    };
  }
}
