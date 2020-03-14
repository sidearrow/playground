import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import { ApiResponceType } from '../ApiResponceType';

const Component: React.FC<{
  pageContext: {
    lineDetail: ApiResponceType.LineDetail;
  }
}> = ({ pageContext: { lineDetail } }) => {
  return (
    <Layout>
      <span>
        <Link to='company'>事業者一覧</Link>
      </span>
      <h1>{lineDetail.lineName}</h1>
      {lineDetail.stations.map(station => (<div>{station.stationName}</div>))}
    </Layout>
  );
};

export default Component;
