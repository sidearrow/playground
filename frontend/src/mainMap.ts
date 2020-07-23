import { Map, View } from 'ol';
import { fromLonLat, transform } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group';
import VectorTileLayer from 'ol/layer/VectorTile';
import { getRailwayLayer } from './map/railwayLayer';
import {
  LineLayerFeature,
  lineLayerFeatureFactory,
} from './map/lineLayerFeature';
import {
  StationLayerFeature,
  stationLayerFeatureFactory,
} from './map/stationLayerFeature';

export type MapState = {
  zoom: number;
  latitude: number;
  longitude: number;
};

export type MapFeature = {
  line: LineLayerFeature | null;
  station: StationLayerFeature | null;
};

export class MainMap {
  private static instance: MainMap;
  private static railwayLayer: VectorTileLayer;

  private map: Map;
  private layerGroup: LayerGroup;

  private static MF_STATION_NAME = '駅名';

  public static init(defaultMapUrl: string, attributions: string): void {
    if (MainMap.instance === undefined) {
      MainMap.instance = new MainMap(defaultMapUrl, attributions);
    }
  }

  public static getInstance(): MainMap {
    return MainMap.instance;
  }

  private constructor(defaultMapUrl: string, attributions: string) {
    this.layerGroup = new LayerGroup({
      layers: [
        new TileLayer({
          source: new OSM({
            url: defaultMapUrl,
            attributions: attributions,
          }),
        }),
        getRailwayLayer(),
      ],
    });
    this.map = new Map({
      target: 'map',
      view: new View({
        center: fromLonLat([135, 35]),
        zoom: 10,
      }),
      layers: this.layerGroup,
    });
  }

  public getState(): MapState {
    const state = this.map.getView().getState();
    const coordinate = transform(state.center, 'EPSG:3857', 'EPSG:4326');

    return {
      zoom: state.zoom,
      latitude: coordinate[0],
      longitude: coordinate[1],
    };
  }

  public onChange(handler: (state: MapState) => void): void {
    this.map.on('moveend', (e) => {
      const coordinate = transform(
        e.frameState.viewState.center,
        'EPSG:3857',
        'EPSG:4326'
      );
      handler({
        zoom: e.frameState.viewState.zoom,
        latitude: coordinate[0],
        longitude: coordinate[1],
      });
    });
  }

  public onPointerMove(handler: (feature: MapFeature | null) => void): void {
    this.map.on('pointermove', (e) => {
      const feature = this.map.getFeaturesAtPixel(e.pixel);
      if (feature.length === 0) {
        handler(null);
        return;
      }
      const props = feature[0].getProperties();
      const layerName = props.layer;
      handler({
        station:
          layerName === 'station' ? stationLayerFeatureFactory(props) : null,
        line: layerName === 'line' ? lineLayerFeatureFactory(props) : null,
      });
    });
  }

  public setLayer(url: string, attributions: string): void {
    this.map.setLayerGroup(
      new LayerGroup({
        layers: [
          new TileLayer({
            source: new OSM({
              url: url,
              attributions: attributions,
            }),
          }),
          getRailwayLayer(),
        ],
      })
    );
  }
}
