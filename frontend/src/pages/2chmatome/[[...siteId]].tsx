import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { BaseLayout } from "../../layouts/BaseLayout";
import { SiteList } from "../../components/SiteList";
import { BottomBar } from "../../components/BottomBar";
import sites from "../../content/sites.json";
import { ModelEntry } from "../../models";
import { EntryList } from "../../components/EntryList";

type Props = {
  siteId?: string;
};

const Component: React.FC<Props> = ({ siteId }) => {
  const [isMenuShow, setIsMenuShow] = React.useState(true);
  const [entries, setEntries] = React.useState<ModelEntry[]>([]);
  return (
    <BaseLayout title="2ch まとめサイト" topBarString="2ch まとめサイト">
      <main className="flex-grow overflow-auto">
        <div className="sm:flex sm:flex-row w-full h-full relative">
          <div
            className={`bg-white overflow-auto w-full h-full sm:max-w-sm sm:border-r absolute sm:static ${
              isMenuShow ? "" : "hidden sm:block"
            }`}
          >
            <SiteList sites={sites} />
          </div>
          <div className="top-0 left-0 bg-white w-full h-full overflow-auto flex-grow">
            <EntryList entries={entries} />
          </div>
        </div>
      </main>
      <div className="w-full border-t sm:hidden">
        <BottomBar isMenuShow={isMenuShow} setIsMenuShow={setIsMenuShow} />
      </div>
    </BaseLayout>
  );
};

export default Component;

export const getStaticProps: GetStaticProps<{
  siteId: string | undefined;
}> = async ({ params }) => {
  const siteId = params?.siteId && params.siteId[0];
  return { props: { siteId: siteId } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = sites.map((v) => ({ params: { siteId: [v.siteId] } }));
  paths.push({ params: { siteId: [] } });
  return {
    paths: paths,
    fallback: false,
  };
};
