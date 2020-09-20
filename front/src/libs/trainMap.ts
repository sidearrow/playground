import { Map, View } from 'ol';
import { VectorTile as VectorTileLayer, Tile as TileLayer } from 'ol/layer';
import { VectorTile as VectorTileSource, XYZ as XYZSource } from 'ol/source';
import { MVT as MVTFormat } from 'ol/format';
import { fromLonLat } from 'ol/proj';

import { CONFIG } from '../config';
import { Style, Stroke, Circle, Fill } from 'ol/style';
import { StyleFunction } from 'ol/style/Style';

type TrainProps = {
  code: string;
  name: string;
  color: string;
  stations: string;
};

export class TrainMap {
  private map: Map;
  private selectedTrainCode: string | null = null;

  private LAYER_NAMES = {
    LINE: 'line',
    TRAIN: 'train',
    TRAIN_STATION: 'train_station',
  };

  private trainStyle = (color: string, isSelected: boolean) =>
    new Style({
      stroke: new Stroke({
        color: color,
        width: isSelected ? 5 : 3,
      }),
      zIndex: 2,
    });

  private trainStationStyle = new Style({
    image: new Circle({
      radius: 10,
      stroke: new Stroke({
        color: '#ac2926',
        width: 10,
      }),
      fill: new Fill({
        color: '#ac2926',
      }),
    }),
    zIndex: 3,
  });

  private lineStyle = new Style({
    stroke: new Stroke({
      color: '#a0aec0',
      width: 1,
    }),
    zIndex: 1,
  });

  private mainLayerStyleFunc: StyleFunction = (feature) => {
    const props = feature.getProperties();
    const layer = props.layer;
    console.log(layer);
    if (layer === this.LAYER_NAMES.LINE) {
      return this.lineStyle;
    }
    if (layer === this.LAYER_NAMES.TRAIN_STATION) {
      return this.trainStationStyle;
    }
    const color = props.color;
    return this.trainStyle(color, props.train_code === this.selectedTrainCode);
  };

  private baseLayer = new TileLayer({
    source: new XYZSource({
      url: CONFIG.BASE_MAP_URL,
    }),
  });

  private mainLayer = new VectorTileLayer({
    source: new VectorTileSource({
      format: new MVTFormat(),
      url: CONFIG.TRAIN_MAP_URL,
    }),
    style: this.mainLayerStyleFunc,
  });

  public constructor() {
    this.map = new Map({
      target: document.getElementById('map') as HTMLElement,
      view: new View({
        center: fromLonLat([135, 35]),
        zoom: 10,
      }),
      layers: [this.baseLayer, this.mainLayer],
    });
    this.map.on('click', (e) => {
      const pixel = this.map.getEventPixel(e.originalEvent);
      const features = this.map.getFeaturesAtPixel(pixel);
      const feature = features.find(
        (f) => f.getProperties().layer === this.LAYER_NAMES.TRAIN
      );
      if (feature === undefined) {
        this.selectedTrainCode = null;
      } else {
        const props = feature.getProperties();
        this.selectedTrainCode = props.train_code;
      }
      this.mainLayer.setStyle(this.mainLayerStyleFunc);
    });
  }
}
