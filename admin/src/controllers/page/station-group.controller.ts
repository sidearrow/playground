import {
  Controller,
  Post,
  BodyParam,
  Res,
  Req,
  Param,
  Get,
  Render,
  QueryParam,
} from 'routing-controllers';
import { Response, Request } from 'express';
import { StationGroupRepository } from '../../repositories/station-group.repository';
import { StationRepository } from '../../repositories/station.repository';

@Controller('/page/station-group')
export class StationGroupController {
  @Get('/')
  @Render('pages/station-group/index')
  async index(@QueryParam('stationName') stationName: string) {
    const stationGroups =
      stationName === undefined || stationName === ''
        ? []
        : await StationGroupRepository.find(stationName);

    return {
      stationGroups: stationGroups,
    };
  }

  @Post('/create')
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @BodyParam('stationId') stationId: string
  ): Promise<Response> {
    await StationGroupRepository.create(Number(stationId));

    res.redirect(req.headers.referer);

    return res;
  }

  @Post('/add')
  async add(
    @Req() req: Request,
    @Res() res: Response,
    @BodyParam('stationGroupId') stationGroupId: string,
    @BodyParam('stationId') stationId: string
  ): Promise<Response> {
    await StationGroupRepository.add(Number(stationGroupId), Number(stationId));

    res.redirect(req.headers.referer);

    return res;
  }

  @Post('/delete')
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @BodyParam('stationGroupId') stationGroupId: string,
    @BodyParam('stationId') stationId: string
  ): Promise<Response> {
    await StationGroupRepository.delete(
      Number(stationGroupId),
      Number(stationId)
    );

    res.redirect(req.headers.referer);

    return res;
  }
}
