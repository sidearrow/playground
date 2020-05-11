import { Controller, Get, Render } from 'routing-controllers';
import { StationGroupRepository } from '../../repositories/station-group.repository';

@Controller('/page/station-group')
export class StationGroupController {
  @Get('/')
  @Render('pages/station-group/index')
  async index() {
    const stationGroups = await StationGroupRepository.getAll();

    return {
      stationGroups: stationGroups,
    };
  }
}
