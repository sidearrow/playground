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
            tileSize: 256,
          },
          train: {
            type: 'vector',
            tiles: [
              'http://localhost:8888/services/train_map/tiles/{z}/{x}/{y}.pbf',
            ],
          },
        },
        layers: [
          {
            id: 'base',
            type: 'raster',
            source: 'base',
          },
          {
            id: 'train',
            type: 'line',
            source: 'train',
            'source-layer': 'line',
          },
        ],
      },
      center: [135, 35],
      zoom: 10,
    });
  }
}
