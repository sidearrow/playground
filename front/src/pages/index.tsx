import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout>
    <p>趣味で鉄道のデータを収集しています</p>
    <Link to="/company">事業者一覧</Link>
    <div>
      <Link to="/references">参考文献</Link>
    </div>
  </Layout>
)

export default IndexPage
