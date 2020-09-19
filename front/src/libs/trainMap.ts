import { Map } from 'mapbox-gl';

export class TrainMap {
  private map: Map;

  public constructor() {
    this.map = new Map({
      container: 'map',
      style: {
        version: 8,
        sources: {
          base: {
            type: 'raster',
            tiles: [
              'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
            ],
          },
        },
        layers: [
          {
            id: 'base',
            type: 'raster',
            source: 'base',
          },
        ],
      },
      center: [135, 35],
      zoom: 10,
    });
  }
}
