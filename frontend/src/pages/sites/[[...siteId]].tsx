import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { BaseLayout } from "../../layouts/BaseLayout";
import { SiteList } from "../../components/SiteList";
import { BottomBar } from "../../components/BottomBar";
import { ModelEntry, ModelSite } from "../../models";
import { EntryList } from "../../components/EntryList";
import { apiGetEntries } from "../../api";
import { TopBar } from "../../components/TopBar";
import sites from "../../content/sites.json";

type Props = {
  sites: ModelSite[];
  site: ModelSite | null;
};

const Component: React.FC<Props> = ({ sites, site }) => {
  const [isMenuShow, setIsMenuShow] = React.useState(false);
  const [entries, setEntries] = React.useState<ModelEntry[]>([]);
  React.useEffect(() => {
    setIsMenuShow(site === null);
    if (site === null) {
      return;
    }
    (async () => {
      const _res = await apiGetEntries(site.siteId);
      setEntries(_res.entries);
    })();
  }, [site]);

  const title = site ? `2ch まとめ | ${site.siteName} |` : "2ch まとめ";

  return (
    <BaseLayout title={title}>
      <header>
        <TopBar>
          {site ? (
            <a
              href={site.siteUrl}
              target="_blank"
              className="overflow-hidden whitespace-nowrap"
            >
              {site.siteName}
            </a>
          ) : (
            "2ch まとめ"
          )}
        </TopBar>
      </header>
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

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const siteId = params?.siteId ? params.siteId[0] : null;
  const site = sites.find((v) => v.siteId === siteId);
  return { props: { sites: sites, site: site ? site : null } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = sites.map((v) => ({ params: { siteId: [v.siteId] } }));
  paths.push({ params: { siteId: [] } });
  return {
    paths: paths,
    fallback: false,
  };
};
