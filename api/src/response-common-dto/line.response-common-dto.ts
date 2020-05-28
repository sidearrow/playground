import { ApiProperty } from "@nestjs/swagger";
import { LineEntity } from "src/entities/line.entity";

export class LineResponseDto {
  @ApiProperty()
  lineId: number;

  @ApiProperty()
  lineCode: string;

  static mappingFromEntity(entity: LineEntity): LineResponseDto {
    return {
      lineId: entity.lineId,
      lineCode: entity.lineCode,
    }
  }
}
