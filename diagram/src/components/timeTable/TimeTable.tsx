import React from "react";
import { Station, Train } from "../../models";
import { TimeTableHeader } from "./TimeTableHeader";
import { TimeTableTrain } from "./TimeTableTrain";

export const TimeTable: React.FC<{
  stations: Station[];
  diaData: Train[];
  isUp: boolean;
}> = ({ stations, diaData, isUp }) => {
  return (
    <div className="flex flex-row" style={{ fontSize: "13px" }}>
      <TimeTableHeader stations={stations} />
      {diaData.map((train, i) => (
        <TimeTableTrain key={i} stations={stations} train={train} isUp={isUp} />
      ))}
    </div>
  );
};
