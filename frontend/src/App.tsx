import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation, Link } from "react-router-dom";
import { apiGetSites } from "./api";
import { BottomBarContent } from "./components/BottomBarContent";
import { EntriesViewer } from "./components/EntriesViewer";
import { SitesViewer } from "./components/SitesViewer";
import { SiteInfo } from "./models";

export const App: React.FC = () => {
  const pathname = useLocation().pathname;
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [sites, setSites] = useState([]);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    id: "",
    title: "",
    url: "#",
    entries: [],
  });
  console.log(siteInfo);

  useEffect(() => {
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
          <a href={siteInfo.url}>{siteInfo.title}</a>
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
                  <EntriesViewer
                    siteInfo={siteInfo}
                    setSiteInfo={setSiteInfo}
                  />
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
