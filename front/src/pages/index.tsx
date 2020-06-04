import React from 'react';
import Link from 'next/link';

import CmpLayout from '../components/layout.cmp';

const Component: React.FC = () => {
  return (
    <CmpLayout title="鉄道統計情報">
      <div>趣味レベルで鉄道の情報を収集しています。</div>
      <section className="mt-3">
        <div className="form-row">
          <div className="col-6">
            <Link href="/company">
              <a className="btn btn-block btn-outline-dark">事業者一覧</a>
            </Link>
          </div>
        </div>
      </section>
    </CmpLayout>
  );
};

export default Component;
