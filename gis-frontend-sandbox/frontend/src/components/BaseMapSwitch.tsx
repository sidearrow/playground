import React, { useState } from 'react';
import { config } from '../config';
import { MainMap } from '../mainMap';
import { SwitchBtn } from './SwitchBtn';

export const BaseMapSwitch: React.FC = () => {
  const baseMaps = config.baseMaps;
  const [activeMapIndex, setActiveMapIndex] = useState(0);

  function handleClickBtn(index: number) {
    setActiveMapIndex(index);
    MainMap.getInstance().setLayer(
      baseMaps[index].url,
      baseMaps[index].attributes
    );
  }

  return (
    <>
      <div>
        {baseMaps.map((v, i) => (
          <div className="mr-1 mb-1 inline-block" key={i}>
            <SwitchBtn
              lable={v.name}
              isOn={activeMapIndex === i}
              onClick={() => handleClickBtn(i)}
            />
          </div>
        ))}
      </div>
    </>
  );
};
