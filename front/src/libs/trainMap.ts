import { Map, View } from 'ol';
import { VectorTile as VectorTileLayer, Tile as TileLayer } from 'ol/layer';
import { VectorTile as VectorTileSource, XYZ as XYZSource } from 'ol/source';
import { MVT as MVTFormat } from 'ol/format';
import { fromLonLat } from 'ol/proj';

import { CONFIG } from '../config';
import { Style, Stroke } from 'ol/style';

type TrainProps = {
  code: string;
  name: string;
  color: string;
  stations: string;
};

const LAYER_NAMES = {
  LINE: 'line',
  TRAIN: 'train',
};

const LINE_STYLE = new Style({
  stroke: new Stroke({
    color: '#a0aec0',
    width: 1,
  }),
});

const TRAIN_STYLE = (color: string) =>
  new Style({
    stroke: new Stroke({
      color: color,
      width: 5,
    }),
  });

export class TrainMap {
  private map: Map;

  public constructor() {
    this.map = new Map({
      target: document.getElementById('map') as HTMLElement,
      view: new View({
        center: fromLonLat([135, 35]),
        zoom: 10,
      }),
      layers: [
        new TileLayer({
          source: new XYZSource({
            url: CONFIG.BASE_MAP_URL,
          }),
        }),
        new VectorTileLayer({
          source: new VectorTileSource({
            format: new MVTFormat(),
            url: CONFIG.TRAIN_MAP_URL,
          }),
          style: (feature) => {
            const props = feature.getProperties();
            const layer = props.layer;
            if (layer === 'line') {
              return LINE_STYLE;
            }
            const color = props.color;
            return TRAIN_STYLE(color);
          },
        }),
      ],
    });
    this.map.on('click', (e) => {
      const pixel = this.map.getEventPixel(e.originalEvent);
      const features = this.map.getFeaturesAtPixel(pixel);
      const feature = features.find(
        (f) => f.getProperties().layer === LAYER_NAMES.TRAIN
      );
      if (feature === undefined) {
        return;
      }
      console.log(feature);
    });
  }
}
