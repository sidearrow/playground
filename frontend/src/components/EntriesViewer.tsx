import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetEntries } from "../api";
import { ModelEntries } from "../models";
import { getDateString } from "../utils";

type Props = {
  entries: ModelEntries;
  setEntries: React.Dispatch<React.SetStateAction<ModelEntries>>;
};

export const EntriesViewer: React.FC<Props> = ({ entries, setEntries }) => {
  const siteId = useParams<{ id: string }>().id;

  useEffect(() => {
    setEntries(entries);
    (async () => {
      const res = await apiGetEntries(siteId);
      setEntries(res);
    })();
  }, [siteId]);

  return (
    <React.Fragment>
      {entries.entries.map((entry, i) => (
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
