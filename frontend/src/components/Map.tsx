import React, { useState, useEffect } from 'react';
import { BaseMapSwitch } from './BaseMapSwitch';
import { MainMap, MapState, MapFeature } from '../mainMap';
import { MapStateViewer } from './MapStateViewer';
import { MapManagerItem } from './MapManagerItem';
import { MapFeatureViewer } from './MapFeatureViewer';
import { SwitchBtn } from './SwitchBtn';
import {
  MapInfoManager,
  MapInfoManagerItem,
} from './MapInfoManager/MapInfoManager';

export const Map: React.FC = () => {
  const mainMap = MainMap.getInstance();

  const [mapState, setMapState] = useState<MapState>(mainMap.getState());
  const [mapFeature, setMapFeature] = useState<MapFeature | null>(null);

  type MapManagerItemKeys =
    | 'mapStateViewer'
    | 'baseMapSwitch'
    | 'mapFeatureViewer';
  const mapMangerItems: { key: MapManagerItemKeys; name: string }[] = [
    { key: 'mapStateViewer', name: 'ベース地図情報' },
    { key: 'mapFeatureViewer', name: '鉄道情報' },
    { key: 'baseMapSwitch', name: 'ベース地図切替' },
  ];
  const [mapManagerItemShow, setMapManagerItemShow] = useState<
    { [K in MapManagerItemKeys]: boolean }
  >({
    mapStateViewer: true,
    mapFeatureViewer: true,
    baseMapSwitch: false,
  });

  const handleClickManagerItemToggleBtn = (key: MapManagerItemKeys) => {
    setMapManagerItemShow({
      ...mapManagerItemShow,
      [key]: !mapManagerItemShow[key],
    });
  };

  useEffect(() => {
    mainMap.onChange((state) => {
      setMapState(state);
    });
    mainMap.onPointerMove((feature) => {
      setMapFeature(feature);
    });
  }, []);

  return (
    <MapInfoManager state={mapManagerItemShow}>
      <MapManagerItem>
        <div>
          {mapMangerItems.map((v, i) => (
            <span className="inline-block mr-2" key={i}>
              <SwitchBtn
                isOn={mapManagerItemShow[v.key]}
                lable={v.name}
                onClick={() => {
                  handleClickManagerItemToggleBtn(v.key);
                }}
              />
            </span>
          ))}
        </div>
      </MapManagerItem>
      <MapInfoManagerItem itemKey="mapStateViewer">
        <MapManagerItem title="地図情報">
          <MapStateViewer {...mapState} />
        </MapManagerItem>
      </MapInfoManagerItem>
      <MapInfoManagerItem itemKey="mapFeatureViewer">
        <MapManagerItem>
          <MapFeatureViewer mapFeature={mapFeature} />
        </MapManagerItem>
      </MapInfoManagerItem>
      <MapInfoManagerItem itemKey="baseMapSwitch">
        <MapManagerItem title="ベース地図切替">
          <BaseMapSwitch />
        </MapManagerItem>
      </MapInfoManagerItem>
    </MapInfoManager>
  );
};
