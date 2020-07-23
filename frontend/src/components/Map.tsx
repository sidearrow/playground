import React, { useState, useEffect } from 'react';
import { BaseMapSwitch } from './BaseMapSwitch';
import { MainMap, MapState, MapFeature } from '../mainMap';
import { MapStateViewer } from './MapStateViewer';
import { MapFeatureViewer } from './MapFeatureViewer';
import { MapInfoManager } from './MapInfoManager';

export const Map: React.FC = () => {
  const mainMap = MainMap.getInstance();

  const [mapState, setMapState] = useState<MapState>(mainMap.getState());
  const [mapFeature, setMapFeature] = useState<MapFeature | null>(null);

  useEffect(() => {
    mainMap.onChange((state) => {
      setMapState(state);
    });
    mainMap.onPointerMove((feature) => {
      setMapFeature(feature);
    });
  }, []);

  return (
    <MapInfoManager>
      <div className="text-sm mb-4">
        <MapStateViewer {...mapState} />
      </div>
      <div className="text-sm mb-4">
        <MapFeatureViewer mapFeature={mapFeature} />
      </div>
      <div className="text-sm mb-4">
        <BaseMapSwitch />
      </div>
    </MapInfoManager>
  );
};
