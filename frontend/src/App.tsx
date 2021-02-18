import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation, Link, useHistory } from "react-router-dom";
import { apiGetSites } from "./api";
import { BottomBarContent } from "./components/BottomBarContent";
import { EntriesViewer } from "./components/EntriesViewer";
import { SitesViewer } from "./components/SitesViewer";
import { ModelEntries, ModelSites } from "./models";
import { settings } from "./settings";

export const App: React.FC = () => {
  const pathname = useLocation().pathname;
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [sites, setSites] = useState<ModelSites>([]);
  const [entries, setEntries] = useState<ModelEntries>({
    site: {
      siteId: "",
      siteName: "",
      siteUrl: "",
    },
    entries: [],
  });

  useEffect(() => {
    window.gtag("config", settings.gaMeasurementId, {
      page_path: pathname,
    });
    (async () => {
      const res = await apiGetSites();
      setSites(res);
    })();
  }, []);
  useEffect(() => {
    setIsMenuShow(false);
  }, [pathname]);

  return (
    <React.Fragment>
      <div className="h-full flex flex-col">
        <header className="flex justify-between bg-gray-200 px-2 py-1">
          <span>まとめ</span>
          <a href={entries.site.siteUrl}>{entries.site.siteName}</a>
        </header>
        <main className="flex-grow overflow-auto">
          <div className="sm:flex sm:flex-row w-full h-full relative">
            <div
              className={`bg-white overflow-auto w-full h-full sm:max-w-sm sm:border-r absolute sm:static ${
                isMenuShow ? "" : "hidden sm:block"
              }`}
            >
              <SitesViewer sites={sites} />
            </div>
            <div className="top-0 left-0 bg-white w-full h-full overflow-auto flex-grow">
              <Switch>
                <Route path="/site/:id">
                  <EntriesViewer entries={entries} setEntries={setEntries} />
                </Route>
              </Switch>
            </div>
          </div>
        </main>
        <div className="w-full border-t sm:hidden">
          <BottomBarContent
            isMenuShow={isMenuShow}
            setIsMenuShow={setIsMenuShow}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
