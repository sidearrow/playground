import React from 'react';
import { LineDetailPageData } from '../gatsby-node/create-page/line-detail.create-page';
import CmpLayout from '../components/layout.component';

const Component: React.FC<{
  pageContext: { pageData: LineDetailPageData };
}> = ({ pageContext: { pageData } }) => {
  return (
    <CmpLayout>
      <h1>{pageData.lineName}</h1>
      {pageData.lineSections.map((line, i) => (
        <div key={i}>{line.lineSectionName}</div>
      ))}
      {pageData.lineSections.map((line, i) => (
        <table key={i} className="table table-sm table-bordered">
          <thead></thead>
          <tbody>
            {line.stations.map((station, i) => (
              <tr key={i}>
                <td>{station.stationName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </CmpLayout>
  );
};

export default Component;
