import React from "react";

export const TimeTableCol: React.FC<{
  height?: number;
  className?: string;
}> = ({ children, height, className }) => {
  height = height || 1;
  return (
    <div
      className={"tt-td " + className}
      style={{
        height: String(height * 18) + "px",
      }}
    >
      {children}
    </div>
  );
};
