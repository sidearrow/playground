import React from 'react';
import { MapFeature } from '../mainMap';

export const MapFeatureViewer: React.FC<{ mapFeature: MapFeature | null }> = ({
  mapFeature,
}) => {
  const stationName =
    mapFeature?.station === null ? '-' : mapFeature?.station.stationName;

  return <div>駅名：{stationName}</div>;
};
