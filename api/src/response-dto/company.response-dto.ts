import { ApiProperty } from '@nestjs/swagger'

export class Company {
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
}
