export const LINE_LAYER_CONST = {
  PROP_KEY: {
    COMPANY_TYPE: '事業者種別',
    END_YEAR: '設置終了',
    LINE_ID: '関係ID',
    LINE_NAME: '路線名',
    COMPANY_NAME: '運営会社',
  },
};

export type LineLayerFeature = {
  companyType: number;
  isAbolish: boolean;
  abolishYear: number | null;
  lineName: string;
  companyName: string;
};

export const lineLayerFeatureFactory = (obj: {
  [key: string]: string;
}): LineLayerFeature => {
  return {
    companyType: Number(obj[LINE_LAYER_CONST.PROP_KEY.COMPANY_TYPE]),
    isAbolish: obj[LINE_LAYER_CONST.PROP_KEY.END_YEAR] !== '9999',
    abolishYear:
      obj[LINE_LAYER_CONST.PROP_KEY.END_YEAR] === '9999'
        ? null
        : Number(obj[LINE_LAYER_CONST.PROP_KEY.END_YEAR]),
    lineName: String(obj[LINE_LAYER_CONST.PROP_KEY.LINE_NAME]),
    companyName: String(obj[LINE_LAYER_CONST.PROP_KEY.COMPANY_NAME]),
  };
};
