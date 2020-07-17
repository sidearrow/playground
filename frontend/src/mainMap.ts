import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export class MainMap {
  private static instance: MainMap;

  private map: Map;
  private layer: TileLayer;

  public static init(defaultMapUrl: string): MainMap {
    if (MainMap.instance === undefined) {
      MainMap.instance = new MainMap(defaultMapUrl);
    }
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
}
