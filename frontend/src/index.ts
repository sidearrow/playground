import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { mapList } from './mapList';

import 'ol/ol.css';
import './style.css';

const l = new TileLayer({
  source: new OSM({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
    attributions:
      '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">国土地理院</a>',
  }),
});

new Map({
  target: 'map',
  view: new View({
    center: fromLonLat([135, 35]),
    zoom: 10,
  }),
  layers: [l],
});
