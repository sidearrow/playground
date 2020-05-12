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

@Controller('/page/station-group')
export class StationGroupController {
  @Get('/')
  @Render('pages/station-group/index')
  async index(@QueryParam('stationName') stationName: string) {
    const stationGroups = await StationGroupRepository.find();

    return {
      stationGroups: stationGroups,
    };
  }

  @Post('/')
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @BodyParam('stationId') stationIds: string[]
  ): Promise<Response> {
    res.redirect(req.headers.referer);

    return res;
  }

  @Post('/:stationGroupId')
  async add(
    @Req() req: Request,
    @Res() res: Response,
    @Param('stationGroupId') stationGroupId: string,
    @BodyParam('stationId') stationId: string
  ): Promise<Response> {
    res.redirect(req.headers.referer);

    return res;
  }
}
