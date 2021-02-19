import React from "react";
import Head from "next/head";
import { TopBar } from "../components/TopBar";
import { BottomBar } from "../components/BottomBar";
import { SitesViewer } from "../components/SitesViewer";
import { EntriesViewer } from "../components/EntriesViewer";

type Props = {
  title?: string;
  topBarString?: string;
};

export const ViewerLayout: React.FC<Props> = ({
  children,
  title,
  topBarString,
}) => {
  title = title ? `${title} | まとめたね` : "まとめたね";

  const [isMenuShow, setIsMenuShow] = React.useState(true);

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta />
      </Head>
      <div className="h-full flex flex-col">
        <header>
          <TopBar>{topBarString}</TopBar>
        </header>
        <main className="flex-grow overflow-auto">
          <div className="sm:flex sm:flex-row w-full h-full relative">
            <div
              className={`bg-white overflow-auto w-full h-full sm:max-w-sm sm:border-r absolute sm:static ${
                isMenuShow ? "" : "hidden sm:block"
              }`}
            >
              MENU
            </div>
            <div className="top-0 left-0 bg-white w-full h-full overflow-auto flex-grow">
              CONTENT
            </div>
          </div>
        </main>
        <div className="w-full border-t sm:hidden">
          <BottomBar isMenuShow={isMenuShow} setIsMenuShow={setIsMenuShow} />
        </div>
      </div>
    </React.Fragment>
  );
};
