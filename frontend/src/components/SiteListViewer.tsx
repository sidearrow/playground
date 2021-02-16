import React from "react";
import { Site } from "../models";

export const SiteListViewer: React.FC<{ sites: Site[] }> = ({ sites }) => {
  return (
    <>
      <div className="grid grid-cols-2">
        {sites.map((site, i) => (
          <a key={i} href={site.site_url} className="p-1 border">
            {site.site_name}
          </a>
        ))}
      </div>
    </>
  );
};
