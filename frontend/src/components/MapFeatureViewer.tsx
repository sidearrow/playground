import React from 'react';
import { MapFeature } from '../mainMap';

export const MapFeatureViewer: React.FC<{ mapFeature: MapFeature | null }> = ({
  mapFeature,
}) => {
  const station = {
    stationName: mapFeature?.station ? mapFeature.station.stationName : '-',
    companyName: mapFeature?.station ? mapFeature.station.companyName : '-',
  };

  const line = {
    lineName: mapFeature?.line ? mapFeature.line.lineName : '-',
    companyName: mapFeature?.line ? mapFeature.line.companyName : '-',
  };

  return (
    <>
      <section className="mb-2">
        <div className="font-bold">路線情報</div>
        <div>路線名：{line.lineName}</div>
        <div>事業者名：{line.companyName}</div>
      </section>
      <section>
        <div className="font-bold">駅情報</div>
        <div>駅名：{station.stationName}</div>
        <div>事業者名：{station.companyName}</div>
      </section>
    </>
  );
};
