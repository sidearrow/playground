import { Map, View } from 'ol';
import { fromLonLat, transform } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group';
import { RailwayLayer } from './map/railwayLayer';
import {
  LineLayerFeature,
  lineLayerFeatureFactory,
  LINE_LAYER_CONST,
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

const railwayLayer = new RailwayLayer();

export class MainMap {
  private static instance: MainMap;

  private map: Map;
  private layerGroup: LayerGroup;
  private state: {
    zoom: number;
  };

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
        railwayLayer.getLayer(),
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
    this.map.on('click', (e) => {
      const features = this.map.getFeaturesAtPixel(e.pixel);
      if (features.length === 0) {
        railwayLayer.selectLine();
        return;
      }
      const targetFeature = features[0];
      railwayLayer.selectLine(
        targetFeature.get(LINE_LAYER_CONST.PROP_KEY.LINE_ID)
      );
    });
  }

  public getState(): MapState {
    const state = this.map.getView().getState();
    const coordinate = transform(state.center, 'EPSG:3857', 'EPSG:4326');
    //this.state.zoom = state.zoom;

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
      const features = this.map.getFeaturesAtPixel(e.pixel);
      if (features.length === 0) {
        this.map.getTargetElement().style.cursor = '';
        handler(null);
        return;
      }
      this.map.getTargetElement().style.cursor = 'pointer';

      const targetFeature = features[0];
      const props = targetFeature.getProperties();
      const layerName = props.layer;
      handler({
        station:
          layerName === 'station' ? stationLayerFeatureFactory(props) : null,
        line: layerName === 'railroad' ? lineLayerFeatureFactory(props) : null,
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
          railwayLayer.getLayer(),
        ],
      })
    );
  }
}
