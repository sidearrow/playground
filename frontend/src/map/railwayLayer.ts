import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import { Style, Stroke, Fill, Circle } from 'ol/style';
import { config } from '../config';
import { Feature } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { StyleFunction } from 'ol/style/Style';

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
  image: new Circle({
    radius: 3,
    fill: new Fill({ color: '#3E403F' }),
  }),
});

export function getLineStyle(
  companyTypeCode: CompanyTypeCode,
  isSelected = false
): Style {
  return new Style({
    stroke: new Stroke({
      width: isSelected ? 5 : 2,
      color: COMPANY_TYPE_COLOR_LIST[companyTypeCode],
    }),
  });
}

export function getCompanyTypeCodeFromFeature(
  feature: Feature | FeatureLike
): CompanyTypeCode {
  return feature.get('事業者種別');
}

export function getRailwayLayer(): VectorTileLayer {
  return new VectorTileLayer({
    source: new VectorTileSource({
      format: new MVT(),
      url: config.railwayTileUrl,
    }),
    style: (feature) => {
      if (feature.get('layer') === 'station') {
        return stationStyle;
      }
      return getLineStyle(
        getCompanyTypeCodeFromFeature(feature),
        feature.get('state') === 'hover'
      );
    },
  });
}

export class RailwayLayer {
  private layer: VectorTileLayer;

  public constructor() {
    this.setLayer();
  }

  public getLayer(): VectorTileLayer {
    return this.layer;
  }

  private setLayer() {
    this.layer = new VectorTileLayer({
      source: new VectorTileSource({
        format: new MVT(),
        url: config.railwayTileUrl,
      }),
      style: RailwayLayer.getStyleFunction(),
    });
  }

  public reloadStyle(): void {
    this.layer.setStyle(RailwayLayer.getStyleFunction(true));
  }

  private static getStyleFunction(isSelected = false): StyleFunction {
    return (feature) => {
      if (feature.get('layer') === 'station') {
        return stationStyle;
      }
      return getLineStyle(getCompanyTypeCodeFromFeature(feature), isSelected);
    };
  }
}
