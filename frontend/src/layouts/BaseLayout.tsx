import React from "react";
import Head from "next/head";
import { TopBar } from "../components/TopBar";

type Props = {
  title?: string;
  topBarString?: string;
};

export const BaseLayout: React.FC<Props> = ({
  children,
  title,
  topBarString,
}) => {
  title = title ? `${title} | まとめたね` : "まとめたね";

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta />
      </Head>
      <div className="h-full flex flex-col">{children}</div>
    </React.Fragment>
  );
};
