import { Map, View } from 'ol';
import { fromLonLat, transform } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import LayerGroup from 'ol/layer/Group';

export type MapState = {
  zoom: number;
  latitude: number;
  longitude: number;
};

export class MainMap {
  private static instance: MainMap;

  private map: Map;
  private layer: TileLayer;

  public static init(defaultMapUrl: string): void {
    if (MainMap.instance === undefined) {
      MainMap.instance = new MainMap(defaultMapUrl);
    }
  }

  public static getInstance(): MainMap {
    return MainMap.instance;
  }

  private constructor(defaultMapUrl: string) {
    this.layer = new TileLayer({
      source: new OSM({
        url: defaultMapUrl,
        attributions:
          '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">国土地理院</a>',
      }),
    });
    this.map = new Map({
      target: 'map',
      view: new View({
        center: fromLonLat([135, 35]),
        zoom: 10,
      }),
      layers: [this.layer],
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

  public setLayer(url: string): void {
    this.map.setLayerGroup(
      new LayerGroup({
        layers: [
          new TileLayer({
            source: new OSM({
              url: url,
            }),
          }),
        ],
      })
    );
  }
}
