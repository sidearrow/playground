import React, { useState, useEffect } from 'react';
import { BaseMapSwitch } from './BaseMapSwitch';
import { MainMap, MapState, MapFeature } from '../mainMap';
import { MapStateViewer } from './MapStateViewer';
import { MapManagerItem } from './MapManagerItem';
import { MapFeatureViewer } from './MapFeatureViewer';
import { MapManager } from './MapManager';

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
    <>
      <MapManager>
        <MapManagerItem>
          <MapStateViewer {...mapState} />
        </MapManagerItem>
        <MapManagerItem>
          <MapFeatureViewer mapFeature={mapFeature} />
        </MapManagerItem>
        <MapManagerItem>
          <BaseMapSwitch />
        </MapManagerItem>
      </MapManager>
    </>
  );
};
