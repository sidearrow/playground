import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetSite } from "../api";
import { SiteEntries, SiteInfo } from "../models";
import { getDateString } from "../utils";

type Props = {
  siteInfo: SiteInfo;
  setSiteInfo: React.Dispatch<React.SetStateAction<SiteInfo>>;
};

export const EntriesViewer: React.FC<Props> = ({ siteInfo, setSiteInfo }) => {
  const siteId = useParams<{ id: string }>().id;

  useEffect(() => {
    setSiteInfo({ ...siteInfo, ...{ id: siteId } });
    (async () => {
      const res = await apiGetSite(siteId);
      setSiteInfo({ ...siteInfo, ...res });
    })();
  }, [siteId]);

  return (
    <React.Fragment>
      {siteInfo.entries.map((entry, i) => (
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
