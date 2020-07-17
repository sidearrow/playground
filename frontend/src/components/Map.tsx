import React, { useState, useEffect } from 'react';
import { BaseMapSwitch } from './BaseMapSwitch';
import { MainMap, MapState } from '../mainMap';
import { MapStateViewer } from './MapStateViewer';

export const Map: React.FC = () => {
  const mainMap = MainMap.getInstance();
  const [mapState, setMapState] = useState<MapState>(mainMap.getState());

  useEffect(() => {
    mainMap.onChange((state) => {
      setMapState(state);
    });
  }, []);

  return (
    <>
      <MapStateViewer {...mapState} />
      <BaseMapSwitch />
    </>
  );
};
