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
    <Layout title={lineDetail.line.lineName + ' | ' + lineDetail.company.companyName}>
      <span>
        <Link to='company'>事業者一覧</Link>
        <Link className="ml-1" to={'company/' + lineDetail.company.companyCode}>{lineDetail.company.companyName}</Link>
      </span>
      <h1>{lineDetail.line.lineName}<small className="ml-1">（{lineDetail.company.companyName}）</small></h1>
      {lineDetail.stations.map(station => (<div>{station.stationName}</div>))}
    </Layout>
  );
};

export default Component;
