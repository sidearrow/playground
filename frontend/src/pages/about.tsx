import React from "react";
import { TopBar } from "../components/TopBar";
import { BaseLayout } from "../layouts/BaseLayout";

const Component: React.FC = () => {
  return (
    <BaseLayout>
      <h1 className="text-lg font-bold">このサイトについて</h1>
      <p>
        色々なサイト様から取得させていただきました情報をまとめています。
        <br />
        節度ある情報収集を心がけているため、最新の情報が反映されていない、情報に漏れがある、等あるかと思いますが、ご容赦ください。
      </p>
    </BaseLayout>
  );
};

export default Component;
