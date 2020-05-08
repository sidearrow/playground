import React from 'react';
import Link from 'next/link';

import CmpLayout from '../components/layout.cmp';

const Component: React.FC = () => {
  return (
    <CmpLayout title="鉄道統計情報">
      <div>
        <Link href="/line">
          <a>路線一覧</a>
        </Link>
      </div>
    </CmpLayout>
  );
};

export default Component;
