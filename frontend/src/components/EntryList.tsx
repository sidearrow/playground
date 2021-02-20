import React from "react";
import { ModelEntry } from "../models";
import { getDateString } from "../utils";

type Props = {
  entries: ModelEntry[];
};

export const EntryList: React.FC<Props> = ({ entries }) => {
  return (
    <React.Fragment>
      {entries.map((entry, i) => (
        <div key={i} className="px-2 py-1 border-b">
          <a href={entry.url} target="_blank">
            {entry.title}
          </a>
          <div className="text-sm text-right text-gray-500">
            {getDateString(entry.updated)}
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
