import React from "react";
import { Link, useParams } from "react-router-dom";
import { ModelSites } from "../models";

type Props = { sites: ModelSites };

export const SitesViewer: React.FC<Props> = ({ sites }) => {
  return (
    <div>
      {sites.map((site, i) => (
        <div key={i} className="block px-2 py-1 border-b flex justify-between">
          <Link to={"/site/" + site.siteId}>{site.siteName}</Link>
        </div>
      ))}
    </div>
  );
};
