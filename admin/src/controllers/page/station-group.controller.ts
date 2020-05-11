import { Controller, Post, BodyParam } from 'routing-controllers';

@Controller('/station-group')
export class StationGroupController {
  @Post('/')
  async create(@BodyParam('stationId')) { }
}
