import React from "react";
import Link from "next/link";
import { BaseLayout } from "../layouts/BaseLayout";

const description =
  "色々なサイト様から取得させていただきました情報をまとめています。" +
  "節度ある情報収集を心がけているため、最新の情報が反映されていない、情報に漏れがある、等あるかと思いますが、ご容赦ください。";

const Component: React.FC = () => {
  return (
    <BaseLayout>
      <p className="p-2">{description}</p>
      <div className="p-2">
        <Link href="/2chmatome">2ch まとめサイト</Link>
      </div>
    </BaseLayout>
  );
};

export default Component;
