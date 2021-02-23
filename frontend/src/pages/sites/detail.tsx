import React, { useState } from "react";
import { useRouter } from "next/router";
import { BaseLayout } from "../../layouts/BaseLayout";
import { ModelEntry, ModelSite } from "../../models";
import { apiGetEntries } from "../../api";
import { EntryCard } from "../../components/EntryCard";
import sites from "../../content/sites.json";

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
      {site ? (
        entries.map((entry, i) => <EntryCard entry={entry} site={site} />)
      ) : (
        <div>情報が見つかりませんでした</div>
      )}
    </BaseLayout>
  );
};

export default Component;
