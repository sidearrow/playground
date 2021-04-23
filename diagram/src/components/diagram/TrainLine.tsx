import React from "react";
import { CoordinateManager } from "../../libs/coordinateManager";
import { Station, Train } from "../../models";

function getPoints(
  cm: CoordinateManager,
  stations: Station[],
  train: Train
): string {
  return train.trainStationTime
    .map((st, i) => {
      if (st.stationTimeType === 1) {
        const y = cm.getY(stations[i].stationStandardTime.up);
        const arrX = st.arrTime === null ? null : cm.getX(st.arrTime);
        const depX = st.depTime === null ? null : cm.getX(st.depTime);
        const res = [];
        if (arrX !== null) {
          res.push(arrX + "," + y);
        }
        if (depX !== null) {
          res.push(depX + "," + y);
        }
        return res;
      }
    })
    .flat()
    .join(" ");
}

export const TrainLine: React.FC<{
  cm: CoordinateManager;
  stations: Station[];
  train: Train;
}> = ({ cm, stations, train }) => {
  return (
    <>
      <polyline stroke="black" points={getPoints(cm, stations, train)} />
    </>
  );
};
