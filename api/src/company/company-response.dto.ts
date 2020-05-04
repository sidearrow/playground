import { ApiProperty } from '@nestjs/swagger';

class LineResponseDto {
  @ApiProperty()
  lineId: number;
}

export class CompanyResponseDto {
  @ApiProperty()
  companyId: number;

  @ApiProperty()
  companyCode: string;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  companyNameAlias: string;

  @ApiProperty({ type: [LineResponseDto] })
  lines: LineResponseDto[];
}
