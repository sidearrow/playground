import React, { useState } from "react";
import { Station } from "../../models";
import { StationEdit } from "./StationEdit";

export const StationConfig: React.FC<{ stationConfig: Station[] }> = ({
  stationConfig,
}) => {
  const [stationIndex, setStationIndex] = useState(0);
  const [editStation, setEditStation] = useState(stationConfig[stationIndex]);
  return (
    <div className="flex flex-1 min-h-0">
      <div className="flex-1 border-r border-gray-200 overflow-y-auto min-h-0 px-4 py-2">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1 font-normal bg-gray-200">駅名</th>
              <th className="border px-2 py-1 font-normal bg-gray-200">上り</th>
              <th className="border px-2 py-1 font-normal bg-gray-200">下り</th>
            </tr>
          </thead>
          <tbody>
            {stationConfig.map((v, i) => (
              <tr
                className={`hover:bg-gray-100 ${
                  i === stationIndex ? "bg-gray-100" : ""
                }`}
                key={i}
                onClick={() => {
                  setStationIndex(i);
                  setEditStation(stationConfig[i]);
                }}
              >
                <td className="border px-2 py-1">{v.stationName}</td>
                <td className="border px-2 py-1">
                  <span>{v.stationTimeDisplay.up.arr ? "着" : ""}</span>
                  <span>{v.stationTimeDisplay.up.dep ? "発" : ""}</span>
                </td>
                <td className="border px-2 py-1">
                  <span>{v.stationTimeDisplay.down.arr ? "着" : ""}</span>
                  <span>{v.stationTimeDisplay.down.dep ? "発" : ""}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2">
        <StationEdit station={editStation} />
      </div>
    </div>
  );
};
