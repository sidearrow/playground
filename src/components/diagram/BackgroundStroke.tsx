import React from "react";

export const BackgroundStroke: React.FC<{
  xy12: [[number, number], [number, number]];
  weight: "light" | "normal" | "bold";
}> = ({ xy12, weight }) => {
  const strokeColor = {
    light: "#9ca3af",
    normal: "#4b5563",
    bold: "#1f2937",
  };
  const strokeWidth = {
    light: "0.25px",
    normal: "0.5px",
    bold: "1px",
  };

  return (
    <line
      x1={xy12[0][0]}
      y1={xy12[0][1]}
      x2={xy12[1][0]}
      y2={xy12[1][1]}
      stroke={strokeColor[weight]}
      strokeWidth={strokeWidth[weight]}
    />
  );
};
