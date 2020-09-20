import { Map, Popup, StyleFunction } from 'mapbox-gl';

type TrainProps = {
  train_code: string;
};

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
            id: 'line',
            type: 'line',
            source: 'train',
            'source-layer': 'line',
            paint: { 'line-color': '#a0aec0' },
          },
          {
            id: 'train',
            type: 'line',
            source: 'train',
            'source-layer': 'train',
            paint: {
              'line-color': ['get', 'color', ['get', 'props']],
              'line-width': 4,
            },
          },
        ],
      },
      center: [135, 35],
      zoom: 10,
    });
    const popup = new Popup();
    this.map.on('mouseenter', 'train', (e) => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'train', (e) => {
      this.map.getCanvas().style.cursor = '';
    });
    this.map.on('click', 'train', (e) => {
      if (e.features === undefined || e.features.length === 0) {
        return;
      }
      const feature = e.features[0];
      const props = e.features[0].properties as TrainProps;
      console.log(props);
      console.log(e.lngLat);
      popup.setLngLat(e.lngLat).setHTML(props.train_code).addTo(this.map);
    });
  }
}
