import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import { ApiResponceType } from '../ApiResponceType';

const Component: React.FC<{
  pageContext: {
    lineDetail: ApiResponceType.LineDetail;
  }
}> = ({ pageContext: { lineDetail } }) => {
  const [isShowAbolish, setIsShowAbolish] = React.useState(false);
  const stations = React.useMemo(() => {
    return lineDetail.stations.filter((station) => {
      if (isShowAbolish) {
        return true;
      }
      return station.status === 0;
    })
  }, [isShowAbolish]);

  return (
    <Layout title={lineDetail.line.lineName + ' | ' + lineDetail.company.companyName}>
      <span>
        <Link to='company'>事業者一覧</Link>
        <Link className="ml-1" to={'company/' + lineDetail.company.companyCode}>{lineDetail.company.companyName}</Link>
      </span>
      <h1>{lineDetail.line.lineName}<small className="ml-1">（{lineDetail.company.companyName}）</small></h1>
      <div className="table-wrapper">
        <div className="mb-1">
          <span>廃止駅：</span>
          <span className={`ml-05 ${isShowAbolish ? 'fw-bold' : 'link'}`} onClick={() => { setIsShowAbolish(true) }}>表示</span>
          <span className={`ml-05 ${isShowAbolish ? 'link' : 'fw-bold'}`} onClick={() => { setIsShowAbolish(false) }}>非表示</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>駅名</th>
              <th>駅名かな</th>
              <th>営業キロ</th>
              <th>廃止</th>
            </tr>
          </thead>
          <tbody>
            {lineDetail.stations.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center">準備中</td>
                </tr>
            )}
            {stations.map(station => (
              <tr>
                <td>{station.stationName}</td>
                <td>{station.stationNameKana}</td>
                <td className="text-right">{station.length === null ? '' : station.length.toFixed(1)}</td>
                <td className="text-center">{station.status === 0 ? '' : '○'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Component;
