const PROP_KEY_COMPANY_TYPE = '事業者種別';
const PROP_KEY_END_YEAR = '設置終了';
const PROP_KEY_LINE_NAME = '路線名';
const PROP_KEY_COMPANY_NAME = '運営会社';

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
    companyType: Number(obj[PROP_KEY_COMPANY_TYPE]),
    isAbolish: obj[PROP_KEY_END_YEAR] !== '9999',
    abolishYear:
      obj[PROP_KEY_END_YEAR] === '9999' ? null : Number(obj[PROP_KEY_END_YEAR]),
    lineName: String(obj[PROP_KEY_LINE_NAME]),
    companyName: String(obj[PROP_KEY_COMPANY_NAME]),
  };
};
