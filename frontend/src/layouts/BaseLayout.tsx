import React from "react";
import Head from "next/head";
import { TopBar } from "../components/TopBar";
import Link from "next/link";

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
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 border-b">
          <div className="max-w-screen-sm mx-auto px-2">
            <TopBar />
          </div>
        </header>
        <main className="w-full max-w-screen-sm mx-auto px-2 py-4 flex-1">
          {children}
        </main>
        <footer className="bg-gray-200 py-8 border-t">
          <div className="max-w-screen-sm mx-auto px-2">
            <Link href="/about">このサイトについて</Link>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};
