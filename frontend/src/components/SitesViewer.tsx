import React from "react";
import { Site } from "../models";

export const SitesViewer: React.FC<{ sites: Site[] }> = ({ sites }) => {
  return (
    <>
      {sites.map((site, i) => (
        <a key={i} href={site.url} className="block px-2 py-1 border-b">
          {site.title}
        </a>
      ))}
    </>
  );
};
