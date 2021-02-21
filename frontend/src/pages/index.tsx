import React from "react";
import Link from "next/link";
import { BaseLayout } from "../layouts/BaseLayout";
import { TopBar } from "../components/TopBar";

const description =
  "色々なサイト様から取得させていただきました情報をまとめています。" +
  "節度ある情報収集を心がけているため、最新の情報が反映されていない、情報に漏れがある、等あるかと思いますが、ご容赦ください。";

const Component: React.FC = () => {
  return (
    <BaseLayout>
      <header>
        <TopBar />
      </header>
      <main className="flex-grow overflow-auto">
        <p className="p-2">{description}</p>
        <div className="p-2">
          <Link href="/sites">サイト一覧</Link>
        </div>
      </main>
    </BaseLayout>
  );
};

export default Component;
