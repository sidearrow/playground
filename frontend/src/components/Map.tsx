import React, { useEffect } from 'react';
import { BaseMapSwitch } from './BaseMapSwitch';
import { MainMap } from '../mainMap';
import { config } from '../config';

export const Map: React.FC = () => {
  useEffect(() => {
    MainMap.init(config.baseMaps[0].url);
  }, []);

  return (
    <>
      <BaseMapSwitch />
      <div id="map"></div>
    </>
  );
};
