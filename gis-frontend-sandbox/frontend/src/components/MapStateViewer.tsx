import React from 'react';
import { MapState } from '../mainMap';

type Props = MapState;

export const MapStateViewer: React.FC<Props> = ({
  zoom,
  latitude,
  longitude,
}) => {
  return (
    <div>
      <div>ズームレベル：{zoom.toFixed(4)}</div>
      <div>緯度：{latitude.toFixed(4)}</div>
      <div>経度：{longitude.toFixed(4)}</div>
    </div>
  );
};
