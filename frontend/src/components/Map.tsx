import React, { useState, useEffect } from 'react';
import { BaseMapSwitch } from './BaseMapSwitch';
import { MainMap, MapState, MapFeature } from '../mainMap';
import { MapStateViewer } from './MapStateViewer';
import { MapManagerItem } from './MapManagerItem';
import { MapFeatureViewer } from './MapFeatureViewer';
import { SwitchBtn } from './SwitchBtn';

export const Map: React.FC = () => {
  const mainMap = MainMap.getInstance();

  const [mapState, setMapState] = useState<MapState>(mainMap.getState());
  const [mapFeature, setMapFeature] = useState<MapFeature | null>(null);

  type MapManagerItemKeys = 'mapStateViewer' | 'baseMapSwitch';
  const mapMangerItems: { key: MapManagerItemKeys; name: string }[] = [
    { key: 'mapStateViewer', name: '地図情報' },
    { key: 'baseMapSwitch', name: 'ベース地図切替' },
  ];
  const [mapManagerItemShow, setMapManagerItemShow] = useState<
    { [K in MapManagerItemKeys]: boolean }
  >({
    mapStateViewer: false,
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
    <>
      <MapManagerItem>
        <div>
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
        </div>
      </MapManagerItem>
      {mapManagerItemShow.mapStateViewer && (
        <MapManagerItem title="地図情報">
          <MapStateViewer {...mapState} />
        </MapManagerItem>
      )}
      <MapManagerItem>
        <MapFeatureViewer mapFeature={mapFeature} />
      </MapManagerItem>
      {mapManagerItemShow.baseMapSwitch && (
        <MapManagerItem>
          <BaseMapSwitch />
        </MapManagerItem>
      )}
    </>
  );
};
