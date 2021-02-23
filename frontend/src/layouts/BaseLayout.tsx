import React from "react";
import Head from "next/head";
import { TopBar } from "../components/TopBar";

type Props = {
  title?: string;
};

export const BaseLayout: React.FC<Props> = ({ children, title }) => {
  title = title ? `${title} | まとめたね` : "まとめたね";

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta />
      </Head>
      <header className="sticky top-0 z-50">
        <TopBar />
      </header>
      <main className="max-w-screen-sm mx-auto">{children}</main>
    </React.Fragment>
  );
};
