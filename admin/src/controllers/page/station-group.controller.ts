import {
  Controller,
  Post,
  BodyParam,
  Res,
  Req,
  Param,
  Body,
} from 'routing-controllers';
import { Response, Request } from 'express';

@Controller('/station-group')
export class StationGroupController {
  @Post('/')
  async create(
    @BodyParam('stationId') stationId,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    console.log(stationId);
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
