import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import { Style, Stroke, Fill, Circle } from 'ol/style';
import { config } from '../config';
import { StyleFunction } from 'ol/style/Style';
import { LINE_LAYER_CONST } from './lineLayerFeature';

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

export class RailwayLayer {
  private static FEATURE_KEY_LAYER = 'layer';

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

  public selectLine(lineId?: string): void {
    this.layer.setStyle(RailwayLayer.getStyleFunction(lineId));
  }

  private static getStyleFunction(selectLineId?: string): StyleFunction {
    return (feature) => {
      if (feature.get(RailwayLayer.FEATURE_KEY_LAYER) === 'station') {
        return stationStyle;
      }
      return RailwayLayer.getLineStyle(
        feature.get(LINE_LAYER_CONST.PROP_KEY.COMPANY_TYPE),
        feature.get(LINE_LAYER_CONST.PROP_KEY.LINE_ID) === selectLineId
      );
    };
  }

  private static getLineStyle(
    companyTypeCode: CompanyTypeCode,
    isSelected = false
  ): Style {
    return new Style({
      stroke: new Stroke({
        width: 2 * (isSelected ? 3 : 1),
        color: COMPANY_TYPE_COLOR_LIST[companyTypeCode],
      }),
    });
  }
}
