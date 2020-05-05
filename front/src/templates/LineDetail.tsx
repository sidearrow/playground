import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout.component';
import { ApiResponceType } from '../ApiResponseType';

const Component: React.FC<{
  pageContext: {
    lineDetail: ApiResponceType.LineDetail;
  };
}> = ({ pageContext: { lineDetail } }) => {
  const hasBranch =
    lineDetail.stations.findIndex((v) => v.branchLineName !== null) !== -1;

  const [isShowAbolish, setIsShowAbolish] = React.useState(false);
  const stations = React.useMemo(() => {
    return lineDetail.stations.filter((station) => {
      if (isShowAbolish) {
        return true;
      }
      return station.status === 0;
    });
  }, [isShowAbolish]);

  return (
    <Layout
      title={lineDetail.line.lineName + ' | ' + lineDetail.company.companyName}
    >
      <span>
        <Link to="company">事業者一覧</Link>
        <Link className="ml-1" to={'company/' + lineDetail.company.companyCode}>
          {lineDetail.company.companyName}
        </Link>
      </span>
      <h1>
        {lineDetail.line.lineName}
        <small className="ml-1">（{lineDetail.company.companyName}）</small>
      </h1>
      <div className="mb-1">
        <span>廃止駅：</span>
        <span
          className={`ml-05 ${isShowAbolish ? 'fw-bold' : 'link'}`}
          onClick={() => {
            setIsShowAbolish(true);
          }}
        >
          表示
        </span>
        <span
          className={`ml-05 ${isShowAbolish ? 'link' : 'fw-bold'}`}
          onClick={() => {
            setIsShowAbolish(false);
          }}
        >
          非表示
        </span>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>駅名</th>
              <th>駅名かな</th>
              <th>
                駅間
                <br />
                距離
              </th>
              <th>
                営業
                <br />
                キロ
              </th>
              <th>廃止</th>
              <th>接続路線</th>
            </tr>
          </thead>
          <tbody>
            {lineDetail.stations.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center">
                  準備中
                </td>
              </tr>
            )}
            {stations.map((station, i) => (
              <>
                {station.branchLineName !== null &&
                  stations[i - 1].branchLineName === null && (
                    <tr className="divide">
                      <td colSpan={6} className="fw-bold">
                        {station.branchLineName}
                      </td>
                    </tr>
                  )}
                <tr
                  className={
                    i > 1 &&
                      stations[i - 1].branchLineName !== null &&
                      station.branchLineName === null
                      ? 'divide'
                      : ''
                  }
                >
                  <td>{station.stationName}</td>
                  <td>{station.stationNameKana}</td>
                  <td className="text-right">
                    {station.lengthBetween === null
                      ? ''
                      : station.lengthBetween.toFixed(1)}
                  </td>
                  <td className="text-right">
                    {station.length === null ? '' : station.length.toFixed(1)}
                  </td>
                  <td className="text-center">
                    {station.status === 0 ? '' : '○'}
                  </td>
                  <td>
                    {station.connectLines.map((line) => (
                      <div>
                        <Link to={'line/' + line.lineCode}>
                          {line.lineName}
                        </Link>
                      </div>
                    ))}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Component;
