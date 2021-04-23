import React, { useState } from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import { ModelCategory, ModelEntryWithSite } from "../../models";
import { apiGetEntries } from "../../api";
import { EntryCard } from "../../components/EntryCard";
import { GetStaticPaths, GetStaticProps } from "next";
import categories from "../../content/categories.json";

type PageProps = {
  category: ModelCategory;
};

const Entries: React.FC<{
  entries: ModelEntryWithSite[];
}> = ({ entries }) => {
  return (
    <React.Fragment>
      {entries.map((entry, i) => (
        <EntryCard entry={entry.entry} site={entry.site} />
      ))}
    </React.Fragment>
  );
};

const Component: React.FC<PageProps> = ({ category }) => {
  const categoryId = category.categoryId;
  const categoryName = category.categoryName;

  const [entries, setEntries] = useState<ModelEntryWithSite[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const _res = await apiGetEntries(categoryId);
        setEntries(_res);
      } catch {}
    })();
  }, [categoryId]);

  return (
    <BaseLayout title={categoryName}>
      <h1 className="text-lg font-bold">{categoryName} まとめ</h1>
      <Entries entries={entries} />
    </BaseLayout>
  );
};

export default Component;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.map((v) => ({
    params: { categoryId: v.categoryId },
  }));
  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const categoryId = ctx.params?.categoryId as string;
  const category = categories.find((v) => v.categoryId === categoryId);
  if (!category) {
    throw Error(categoryId);
  }
  return { props: { category: category } };
};
