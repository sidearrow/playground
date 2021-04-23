import React from "react";
import { CoordinateManager } from "../../libs/coordinateManager";
import { Time, Station } from "../../models";
import { utils } from "../../utils";
import { BackgroundStroke } from "./BackgroundStroke";

const minuteArray = [...Array(60)].map((_, i) => i);
const getTimeArray = (minHour: number, maxHour: number) =>
  utils
    .range(minHour, maxHour)
    .map((h) => minuteArray.map((m) => new Time(h, m)))
    .flat();

const StrokeStation: React.FC<{ cm: CoordinateManager; station: Station }> = ({
  cm,
  station,
}) => {
  const y = cm.getY(station.stationStandardTime.up);
  return (
    <>
      <text x={0} y={y - 5}>
        {station.stationName}
      </text>
      <BackgroundStroke
        weight="normal"
        xy12={[
          [0, y],
          [cm.width, y],
        ]}
      />
    </>
  );
};

export const Background: React.FC<{
  cm: CoordinateManager;
  minHour: number;
  maxHour: number;
  stations: Station[];
}> = ({ cm, minHour, maxHour, stations }) => {
  return (
    <>
      {getTimeArray(minHour, maxHour).map((time, i) => {
        if (time.m === 0) {
          const x = cm.getX(time);
          return (
            <>
              <text x={x + 3} y={15}>
                {time.h}
              </text>
              <BackgroundStroke
                weight="bold"
                xy12={[
                  [x, 0],
                  [x, 1000],
                ]}
              />
            </>
          );
        }
        if (time.m % 10 === 0) {
          const x = cm.getX(time);
          return (
            <BackgroundStroke
              weight="normal"
              xy12={[
                [x, 0],
                [x, 1000],
              ]}
            />
          );
        }
        const x = cm.getX(time);
        return (
          <BackgroundStroke
            weight="light"
            xy12={[
              [x, 0],
              [x, 1000],
            ]}
          />
        );
      })}
      {stations.map((station, i) => (
        <StrokeStation key={i} cm={cm} station={station} />
      ))}
    </>
  );
};
