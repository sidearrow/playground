import React, { useEffect, useState } from "react";
import { BaseLayout } from "../layouts/BaseLayout";
import { ModelEntryWithSite } from "../models";
import { apiGetEntriesAll } from "../api";
import { EntryCard } from "../components/EntryCard";

const Component: React.FC = () => {
  const [entries, setEntries] = useState<ModelEntryWithSite[]>([]);
  useEffect(() => {
    (async () => {
      const _entries = await apiGetEntriesAll();
      setEntries(_entries);
    })();
  }, []);

  return (
    <BaseLayout>
      {entries.map((entry, i) => (
        <EntryCard entry={entry.entry} site={entry.site} />
      ))}
    </BaseLayout>
  );
};

export default Component;
