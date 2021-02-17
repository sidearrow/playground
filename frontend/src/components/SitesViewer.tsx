import React from "react";
import { Link, useParams } from "react-router-dom";
import { Site } from "../models";

type Props = { sites: Site[] };

export const SitesViewer: React.FC<Props> = ({ sites }) => {
  return (
    <div>
      {sites.map((site, i) => (
        <Link
          to={"/site/" + site.id}
          key={i}
          href={site.url}
          className={`block px-2 py-1 border-b flex justify-between`}
        >
          <span className="flex-grow mr-2">{site.title}</span>
          <span>{site.entry_num}</span>
        </Link>
      ))}
    </div>
  );
};
