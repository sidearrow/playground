import { Map, View } from 'ol';
import { VectorTile as VectorTileLayer, Tile as TileLayer } from 'ol/layer';
import { VectorTile as VectorTileSource, XYZ as XYZSource } from 'ol/source';
import { MVT as MVTFormat } from 'ol/format';
import { fromLonLat } from 'ol/proj';

import { CONFIG } from '../config';
import { Style, Stroke, Circle, Fill, Text } from 'ol/style';
import { StyleFunction } from 'ol/style/Style';

type TrainProps = {
  train_code: string;
  train_name: string;
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

  private trainStyle = (color: string, isSelected: boolean) => {
    return [
      new Style({
        stroke: new Stroke({
          color: color,
          width: 8,
        }),
      }),
      new Style({
        stroke: new Stroke({
          color: isSelected ? color : 'white',
          width: 6,
        }),
        zIndex: 2,
      }),
    ];
  };

  private trainStationStyle = (stationName: string) =>
    new Style({
      image: new Circle({
        radius: 4,
        fill: new Fill({
          color: '#1a202c',
        }),
      }),
      text: new Text({
        offsetX: 5,
        font: 'bold 15px arial,sans-serif',
        text: stationName,
        textAlign: 'left',
        textBaseline: 'middle',
        stroke: new Stroke({ color: '#ffffff', width: 1 }),
      }),
      zIndex: 9999,
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
    if (layer === this.LAYER_NAMES.LINE) {
      return this.lineStyle;
    }
    if (layer === this.LAYER_NAMES.TRAIN_STATION) {
      return this.trainStationStyle(props.station_name);
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
      controls: [],
    });
  }

  public onClick(callback: (props: TrainProps | null) => void): void {
    this.map.on('click', (e) => {
      const pixel = this.map.getEventPixel(e.originalEvent);
      const features = this.map.getFeaturesAtPixel(pixel);
      const feature = features.find(
        (f) => f.getProperties().layer === this.LAYER_NAMES.TRAIN
      );
      if (feature === undefined) {
        this.selectedTrainCode = null;
        callback(null);
      } else {
        const props = feature.getProperties() as TrainProps;
        this.selectedTrainCode = props.train_code;
        callback(props);
      }
      this.mainLayer.setStyle(this.mainLayerStyleFunc);
    });
  }
}
