import React from "react";
import { Station, StationTime, Train } from "../../models";
import { TimeTableCol } from "./TimeTableCol";

const TimeTableTrainCol: React.FC<{
  station: Station;
  stationTime: StationTime;
  isUp: boolean;
}> = ({ station, stationTime, isUp }) => {
  const isShowArr = isUp
    ? station.stationTimeDisplay.up.arr
    : station.stationTimeDisplay.down.arr;
  const isShowDep = isUp
    ? station.stationTimeDisplay.up.dep
    : station.stationTimeDisplay.down.dep;
  return (
    <>
      {isShowArr && (
        <TimeTableCol>
          <span className="font-mono">
            {stationTime.arrTime === null
              ? "･･"
              : stationTime.arrTime.toString()}
          </span>
        </TimeTableCol>
      )}
      {isShowDep && (
        <TimeTableCol>
          <span className="font-mono">
            {stationTime.depTime === null
              ? "･･"
              : stationTime.depTime.toString()}
          </span>
        </TimeTableCol>
      )}
    </>
  );
};

export const TimeTableTrain: React.FC<{
  stations: Station[];
  train: Train;
  isUp: boolean;
}> = ({ stations, train, isUp }) => {
  return (
    <div style={{ minWidth: "40px" }}>
      {train.trainStationTime.map((v, i) => {
        return (
          <TimeTableTrainCol
            key={i}
            station={stations[i]}
            stationTime={v}
            isUp={isUp}
          />
        );
      })}
    </div>
  );
};
