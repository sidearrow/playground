import { Controller, Get, Param } from '@nestjs/common';
import { LineService } from './line.service';

@Controller('line')
export class LineController {
  constructor(private readonly lineService: LineService) { }

  @Get(':lineId')
  find(@Param('lineId') lineId) {
    return this.lineService.find(lineId)
  }
}
