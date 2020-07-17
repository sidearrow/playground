import React, { useState } from 'react';
import { config } from '../config';
import { MainMap } from '../mainMap';

export const BaseMapSwitch: React.FC = () => {
  const baseMaps = config.baseMaps;
  const [activeMapIndex, setActiveMapIndex] = useState(0);

  function handleClickBtn(index: number) {
    setActiveMapIndex(index);
    MainMap.getInstance().setLayer(baseMaps[index].url);
  }

  return (
    <>
      <div className="font-bold">ベース地図切替</div>
      <div>
        {baseMaps.map((v, i) => {
          const btnColor =
            activeMapIndex === i
              ? 'bg-blue-700 hover:bg-blue-500'
              : 'bg-blue-500 hover:bg-blue-700';

          return (
            <div className="mr-1 inline-block">
              <button
                className={`${btnColor} text-white px-2 py-1 rounded`}
                onClick={() => handleClickBtn(i)}
              >
                {v.name}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
