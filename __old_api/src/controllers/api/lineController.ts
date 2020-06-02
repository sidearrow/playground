import { Controller, Get, Param, QueryParam } from 'routing-controllers';
import { LineRepository } from '../../repositories/lineRepository';
import { LineEntity } from '../../entities/lineEntity';

@Controller('/api/line')
export class ApiLineController {
  @Get('/')
  async index(
    @QueryParam('companyId') companyId: number
  ): Promise<LineEntity[]> {
    const lineRepository = new LineRepository();
    const lines = await lineRepository.get(companyId ?? null);

    return lines;
  }

  @Get('/:lineId')
  async detail(@Param('lineId') lineId: number): Promise<LineEntity> {
    const lineRepository = new LineRepository();
    const line = await lineRepository.getDetail(lineId);

    return line;
  }
}
