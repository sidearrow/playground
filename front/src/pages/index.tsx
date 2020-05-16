import React from 'react';
import Link from 'next/link';

import CmpLayout from '../components/layout.cmp';

const Component: React.FC = () => {
  return (
    <CmpLayout title="鉄道統計情報">
      <div className="alert alert-info">趣味レベルで鉄道の情報を収集し公開しています。</div>
      <div>
        <span className="mr-2">
          <Link href="/company">事業者一覧</Link>
        </span>
        <span>
          <Link href="/line">
            <a>路線一覧</a>
          </Link>
        </span>
      </div>
      <h2>統計情報</h2>
      <section>
        <Link href="/transport-passenger">輸送人員</Link>
      </section>
    </CmpLayout>
  );
};

export default Component;
