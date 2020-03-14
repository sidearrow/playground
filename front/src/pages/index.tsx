import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout>
    <p>趣味で鉄道のデータを収集しています</p>
    <Link to="/company">事業者一覧</Link>
  </Layout>
)

export default IndexPage
