import React, { useState } from "react";
import { useRouter } from "next/router";
import { BaseLayout } from "../../layouts/BaseLayout";
import { ModelEntry, ModelSite } from "../../models";
import { apiGetEntries } from "../../api";
import { EntryCard } from "../../components/EntryCard";
import sites from "../../content/sites.json";

const Entries: React.FC<{
  site: ModelSite;
  entries: ModelEntry[];
}> = ({ site, entries }) => {
  return (
    <React.Fragment>
      <div className="mb-4">
        <a target="_blank" href={site.siteUrl}>
          {site.siteName}
        </a>
      </div>
      {entries.map((entry, i) => (
        <EntryCard entry={entry} site={site} />
      ))}
    </React.Fragment>
  );
};

const NotFound: React.FC = () => {
  return (
    <div>
      各サイトの記事一覧ページです。
      <br />
      サイト一覧からサイトを選択してください。
    </div>
  );
};

const Component: React.FC = () => {
  const router = useRouter();
  const siteId = router.query.id as string;
  const [entries, setEntries] = useState<ModelEntry[]>([]);
  const [site, setSite] = useState<ModelSite | null>(null);

  React.useEffect(() => {
    const _site = sites.find((v) => v.siteId === siteId);
    if (!_site) {
      return;
    }
    setSite(_site);
    (async () => {
      try {
        const _res = await apiGetEntries(siteId);
        setEntries(_res.entries);
      } catch {}
    })();
  }, [siteId]);

  return (
    <BaseLayout title="">
      {site ? <Entries site={site} entries={entries} /> : <NotFound />}
    </BaseLayout>
  );
};

export default Component;
