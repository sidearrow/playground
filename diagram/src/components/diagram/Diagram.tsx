import React from "react";
import { CoordinateManager } from "../../libs/coordinateManager";
import { Background } from "./Background";

import { Station, Train } from "../../models";
import { TrainLine } from "./TrainLine";

export const Diagram: React.FC<{ stations: Station[]; diaData: Train[] }> = ({
  stations,
  diaData,
}) => {
  const coordinateManager = new CoordinateManager(
    10,
    4,
    10,
    stations[stations.length - 1].stationStandardTime.up
  );
  return (
    <>
      <div className="overflow-auto">
        <svg
          x="0"
          y="0"
          width={coordinateManager.width}
          height={coordinateManager.height}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <Background
            cm={coordinateManager}
            minHour={4}
            maxHour={10}
            stations={stations}
          />
          {diaData.map((train, i) => (
            <TrainLine
              key={i}
              cm={coordinateManager}
              train={train}
              stations={stations}
            />
          ))}
        </svg>
      </div>
    </>
  );
};
