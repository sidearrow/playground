import React from 'react';
import { config } from '../config';

export const BaseMapSwitch: React.FC = () => {
  const baseMaps = config.baseMaps;

  return (
    <>
      <h5 className="font-bold">ベース地図切替</h5>
      <div>
        {baseMaps.map((v) => (
          <label className="mr-2">
            <input type="radio" name="baseMap" value={v.id} />
            <span className="ml-1">{v.name}</span>
          </label>
        ))}
      </div>
    </>
  );
};
