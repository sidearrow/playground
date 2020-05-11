import {
  Controller,
  Post,
  BodyParam,
  Res,
  Req,
  Param,
} from 'routing-controllers';
import { Response, Request } from 'express';

@Controller('/station-group')
export class StationGroupController {
  @Post('/')
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @BodyParam('stationId') stationId: string
  ): Promise<Response> {
    res.redirect(req.headers.referer);

    return res;
  }

  @Post('/:stationGroupId')
  async add(
    @Req() req: Request,
    @Res() res: Response,
    @Param('stationGroupId') stationGroupId: string
  ): Promise<Response> {
    res.redirect(req.headers.referer);

    return res;
  }
}
