import React, { useEffect, useState } from "react";
import { apiGetSite } from "./api";
import { EntriesViewer } from "./components/EntriesViewer";
import { SiteListViewer } from "./components/SiteListViewer";
import { Entry } from "./models";

import sites from "./sites.json";

export const App: React.FC = () => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    (async () => {
      const res = await apiGetSite("alfalfalfa");
      setEntries(res);
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
          {isMenuShow && <SiteListViewer sites={sites} />}
        </main>
        <div className="w-full bg-gray-200 grid grid-cols-2 border-t border-gray-400">
          <div
            className="p-1 text-center border-r border-gray-400"
            onClick={() => {
              setIsMenuShow(false);
            }}
          >
            記事一覧
          </div>
          <div
            className="p-1 text-center"
            onClick={() => {
              setIsMenuShow(true);
            }}
          >
            サイト一覧
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
