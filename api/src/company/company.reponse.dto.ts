import { ApiProperty } from "@nestjs/swagger";
import { CompanyResponseDto } from "src/response-common-dto/company.response-common-dto";
import { LineResponseDto } from "src/response-common-dto/line.response-common-dto";
import { CompanyEntity } from "src/entities/company.entity";

export class CompanyFindResponseDto extends CompanyResponseDto {
  @ApiProperty({ type: LineResponseDto, isArray: true })
  lines: LineResponseDto[];

  static mappingFromEntity(entity: CompanyEntity): CompanyFindResponseDto {
    return {
      ...super.createFromEntity(entity),
      lines: entity.lines.map(line => LineResponseDto.mappingFromEntity(line))
    }
  }
}

export class CompanyFindAllResponseDto extends CompanyResponseDto { }
