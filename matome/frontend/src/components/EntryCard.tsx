import React from "react";
import { ModelEntry, ModelSite } from "../models";
import { getDateString } from "../utils";

type Props = {
  entry: ModelEntry;
  site: ModelSite;
};

export const EntryCard: React.FC<Props> = ({ entry, site }) => {
  return (
    <div className="py-2 border-b">
      <div className="pb-1 break-all">
        <a
          target="_blank"
          href={entry.url}
          className="break-all block sm:inline"
        >
          {entry.title}
        </a>
      </div>
      <div className="flex justify-between font-gray-700 text-sm">
        <span>{site.siteName}</span>
        <span>{getDateString(entry.updated)}</span>
      </div>
    </div>
  );
};
