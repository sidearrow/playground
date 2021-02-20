import Link from "next/link";
import React from "react";
import { ModelSites } from "../models";

type Props = { sites: ModelSites };

export const SiteList: React.FC<Props> = ({ sites }) => {
  return (
    <div>
      {sites.map((site, i) => (
        <div key={i} className="block px-2 py-1 border-b flex justify-between">
          <Link href={"/2chmatome/" + site.siteId}>{site.siteName}</Link>
        </div>
      ))}
    </div>
  );
};
