import React, { useEffect, useState } from "react";
import { apiGetSite, apiGetSites } from "./api";
import { EntriesViewer } from "./components/EntriesViewer";
import { SitesViewer } from "./components/SitesViewer";
import { Entry } from "./models";

export const App: React.FC = () => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [sites, setSites] = useState([]);
  console.log(sites);

  useEffect(() => {
    (async () => {
      const res = await apiGetSites();
      setSites(res);
    })();
  }, []);

  return (
    <React.Fragment>
      <div className="h-full flex flex-col">
        <div>
          <header className="bg-gray-300 p-1 flex justify-between">
            <div>まとめ</div>
            <div>サイト名</div>
          </header>
        </div>
        <main className="flex-grow overflow-auto">
          {!isMenuShow && <EntriesViewer entries={entries} />}
          {isMenuShow && <SitesViewer sites={sites} />}
        </main>
        <div className="w-full grid grid-cols-2 border-t">
          <button
            className={`p-1 text-center ${
              isMenuShow ? "bg-gray-200" : "bg-gray-300"
            }`}
            onClick={() => {
              setIsMenuShow(false);
            }}
          >
            記事一覧
          </button>
          <button
            className={`p-1 text-center ${
              isMenuShow ? "bg-gray-300" : "bg-gray-200"
            }`}
            onClick={() => {
              setIsMenuShow(true);
            }}
          >
            サイト一覧
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
