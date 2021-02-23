import React from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import sites from "../../content/sites.json";
import Link from "next/link";

export const Component: React.FC = () => {
  return (
    <BaseLayout title="サイト一覧">
      <h1>サイト一覧</h1>
      {sites.map((site, i) => (
        <div className="my-1">
          <Link href={`/sites/${site.siteId}`}>
            <a>{site.siteName}</a>
          </Link>
        </div>
      ))}
    </BaseLayout>
  );
};

export default Component;
