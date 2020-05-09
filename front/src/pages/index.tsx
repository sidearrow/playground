import React from 'react';
import Link from 'next/link';

import CmpLayout from '../components/layout.cmp';

const Component: React.FC = () => {
  return (
    <CmpLayout title="鉄道統計情報">
      <div className="alert alert-info">趣味レベルで鉄道の情報を収集し公開しています。</div>
      <div>
        <Link href="/line">
          <a>路線一覧</a>
        </Link>
      </div>
    </CmpLayout>
  );
};

export default Component;
