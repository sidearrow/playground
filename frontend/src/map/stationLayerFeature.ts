const PROP_KEY_COMPANY_TYPE = '事業者種別';
const PROP_KEY_COMPANY_NAME = '運営会社';
const PROP_KEY_END_YEAR = '設置終了';
const PROP_KEY_STATION_NAME = '駅名';

export type StationLayerFeature = {
  companyType: number;
  isAbolish: boolean;
  abolishYear: number | null;
  stationName: string;
  companyName: string;
};

export const stationLayerFeatureFactory = (obj: {
  [key: string]: string;
}): StationLayerFeature => {
  return {
    companyType: Number(obj[PROP_KEY_COMPANY_TYPE]),
    isAbolish: obj[PROP_KEY_END_YEAR] !== '9999',
    abolishYear:
      obj[PROP_KEY_END_YEAR] === '9999' ? null : Number(obj[PROP_KEY_END_YEAR]),
    stationName: String(obj[PROP_KEY_STATION_NAME]),
    companyName: String(obj[PROP_KEY_COMPANY_NAME]),
  };
};
