import React from "react";
import { Station } from "../../models";
import { TimeTableCol } from "./TimeTableCol";

export const TimeTableHeader: React.FC<{
  stations: Station[];
}> = ({ stations }) => {
  return (
    <div className="flex flex-col">
      {stations.map((station, i) => {
        return (
          <TimeTableCol key={i} className="border-r border-gray-400">
            {station.stationName}
          </TimeTableCol>
        );
      })}
    </div>
  );
};
