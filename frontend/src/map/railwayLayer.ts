import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import { Style, Stroke } from 'ol/style';

const CODELIST_COMPANY_TYPE = {
  '1': '新幹線',
  '2': 'JR 在来線',
  '3': '公営鉄道',
  '4': '民営鉄道',
  '5': '第三セクター',
};

type CompanyTypeCode = keyof typeof CODELIST_COMPANY_TYPE;

const COMPANY_TYPE_COLOR_LIST: { [k in CompanyTypeCode]: string } = {
  '1': '#3C74A6',
  '2': '#66B8D9',
  '3': '#BCBF60',
  '4': '#D9A25F',
  '5': '#D95436',
};

const stationStyle = new Style({
  stroke: new Stroke({ width: 6, color: '#3E403F' }),
});

function getRailroadStyle(companyTypeCode: CompanyTypeCode): Style {
  return new Style({
    stroke: new Stroke({
      width: 2,
      color: COMPANY_TYPE_COLOR_LIST[companyTypeCode],
    }),
  });
}

export function getRailwayLayer(): VectorTileLayer {
  return new VectorTileLayer({
    source: new VectorTileSource({
      format: new MVT(),
      url: 'http://localhost:3000/railway/{z}/{x}/{y}.pbf',
    }),
    style: (feature) => {
      if (feature.get('layer') === 'station') {
        return stationStyle;
      }
      return getRailroadStyle(feature.get('事業者種別'));
    },
  });
}
