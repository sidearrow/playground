import { Map, View } from 'ol';
import { VectorTile as VectorTileLayer, Tile as TileLayer } from 'ol/layer';
import { VectorTile as VectorTileSource, XYZ as XYZSource } from 'ol/source';
import { MVT as MVTFormat, GeoJSON as GeoJSONFormat } from 'ol/format';
import { fromLonLat } from 'ol/proj';

import { CONFIG } from '../config';
import { Style, Stroke, Circle, Fill } from 'ol/style';
import { GeoJSONFeatureCollection } from 'ol/format/GeoJSON';

import TRAIN_STATIONS_JSON from '../train_stations.json';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

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
  zIndex: 1,
});

const TRAIN_STYLE = (color: string) =>
  new Style({
    stroke: new Stroke({
      color: color,
      width: 5,
    }),
    zIndex: 2,
  });

const TRAIN_STATION_STYLE = new Style({
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

function getTrainStationsGeoJSON(code: 'uzushio'): GeoJSONFeatureCollection {
  return TRAIN_STATIONS_JSON[code] as GeoJSONFeatureCollection;
}

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
        new VectorLayer({
          source: new VectorSource({
            features: new GeoJSONFormat().readFeatures(
              TRAIN_STATIONS_JSON.uzushio
            ),
          }),
          style: TRAIN_STATION_STYLE,
        }),
      ],
    });
    this.map.on('click', (e) => {
      const pixel = this.map.getEventPixel(e.originalEvent);
      const features = this.map.getFeaturesAtPixel(pixel);
      console.log(features);
      const feature = features.find(
        (f) => f.getProperties().layer === LAYER_NAMES.TRAINi
      );
      if (feature === undefined) {
        return;
      }
      console.log(feature);
      const props = feature.getProperties();
      const geojson = getTrainStationsGeoJSON(props.code);
      console.log(geojson);
      this.map.addLayer(
        new VectorLayer({
          source: new VectorSource({
            format: new GeoJSONFormat(),
            features: new GeoJSONFormat().readFeatures(geojson),
          }),
          style: TRAIN_STATION_STYLE,
        })
      );
      console.log(this.map.getLayers());
    });
  }
}
