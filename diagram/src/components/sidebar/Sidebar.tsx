import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { LocalDB } from "../../localDB";

const MenuItem: React.FC<{
  to?: string;
  indent?: number;
}> = ({ to, indent, children }) => {
  const pl = indent === 1 ? "pl-4" : indent === 2 ? "pl-8" : "";
  const base = (
    <div
      className={
        "px-4 py-1" +
        (to === undefined ? "" : " cursor-pointer hover:bg-gray-200")
      }
    >
      <span className={"whitespace-nowrap " + pl}>{children}</span>
    </div>
  );
  if (to === undefined) {
    return base;
  }
  return <Link to={to}>{base}</Link>;
};

export const Sidebar: React.FC<{
  diaNames: string[];
}> = ({ diaNames }) => {
  const onClickSave = () => {};
  return (
    <aside className="py-2 border-r border-gray-200">
      <MenuItem to="/station">駅</MenuItem>
      <MenuItem to="/train">列車種別</MenuItem>
      <MenuItem>ダイヤ</MenuItem>
      {diaNames.map((diaName, i) => (
        <React.Fragment key={i}>
          <MenuItem indent={1}>{diaName}</MenuItem>
          <MenuItem to={`/dias-${i}-timetable-up`} indent={2}>
            上り時刻表
          </MenuItem>
          <MenuItem to={`/dias-${i}-timetable-down`} indent={2}>
            下り時刻表
          </MenuItem>
          <MenuItem to={`/dias-${i}-diagram`} indent={2}>
            ダイヤグラム
          </MenuItem>
        </React.Fragment>
      ))}
      <MenuItem to="/json-viewer">JSON Viewer</MenuItem>
      <div className="px-4 py-1">
        <Button onClick={onClickSave}>保存</Button>
      </div>
    </aside>
  );
};
