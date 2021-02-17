import React from "react";
import { Link, useParams } from "react-router-dom";
import { ModelSites } from "../models";

type Props = { sites: ModelSites };

export const SitesViewer: React.FC<Props> = ({ sites }) => {
  return (
    <div>
      {sites.map((site, i) => (
        <Link
          to={"/site/" + site.siteId}
          key={i}
          className={`block px-2 py-1 border-b flex justify-between`}
        >
          <span className="flex-grow mr-2">{site.siteName}</span>
          <span>{site.entryNum}</span>
        </Link>
      ))}
    </div>
  );
};
