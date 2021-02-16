import React from "react";
import { Entry } from "../models";

export const EntriesViewer: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  return (
    <React.Fragment>
      {entries.map((entry, i) => (
        <div key={i} className="p-1 border-b">
          <a href={entry.url} target="_blank">
            <div className="mb-1">{entry.title}</div>
            <div className="text-sm text-right text-gray-500">
              {entry.updated_formated}
            </div>
          </a>
        </div>
      ))}
    </React.Fragment>
  );
};
