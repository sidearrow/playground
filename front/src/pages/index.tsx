import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout.component';

const Component: React.FC = () => (
  <Layout>
    <p>趣味で鉄道のデータを収集しています</p>
    <ul>
      <li>
        <Link to="/company">事業者一覧</Link>
      </li>
      <li>
        <Link to="/eigyo-kilo">事業者別営業キロ</Link>
      </li>
    </ul>
    <div>
      <Link to="/references">参考文献</Link>
    </div>
  </Layout>
);

export default Component;
