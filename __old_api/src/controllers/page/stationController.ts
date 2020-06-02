import { Controller, Get, Render, QueryParam } from 'routing-controllers';
import { StationRepository } from '../../repositories/stationRepository';

@Controller('/page/station')
export class StationController {
  @Get('/')
  @Render('pages/station/index')
  async index(@QueryParam('stationName') stationName: string) {
    stationName =
      stationName === undefined || stationName === '' ? null : stationName;

    const stations = await StationRepository.find(stationName);

    return {
      stations: stations,
      search: {
        stationName: stationName,
      },
    };
  }
}
