import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { BaseLayout } from "../../layouts/BaseLayout";
import { ModelEntry, ModelSite } from "../../models";
import { apiGetEntries } from "../../api";
import { EntryCard } from "../../components/EntryCard";
import sites from "../../content/sites.json";

type Props = {
  site: ModelSite;
};

const Component: React.FC<Props> = ({ site }) => {
  const [entries, setEntries] = React.useState<ModelEntry[]>([]);
  React.useEffect(() => {
    (async () => {
      const _res = await apiGetEntries(site.siteId);
      setEntries(_res.entries);
    })();
  }, [site]);

  return (
    <BaseLayout title={site.siteName}>
      {entries.map((entry, i) => (
        <EntryCard entry={entry} site={site} />
      ))}
    </BaseLayout>
  );
};

export default Component;

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const siteId = params?.siteId;
  const site = sites.find((v) => v.siteId === siteId);
  if (!site) {
    throw Error();
  }
  return { props: { site: site } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = sites.map((v) => ({ params: { siteId: v.siteId } }));
  return {
    paths: paths,
    fallback: false,
  };
};
