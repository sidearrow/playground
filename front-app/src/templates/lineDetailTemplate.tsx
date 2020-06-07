import React from 'react';
import { PagePropsLineDetail } from '../gatsbyNode/pagePropsTypes';
import { CmpLayout } from '../components/cmpLayout';
import { CmpHead } from '../components/cmpHead';
import { CmpBreadcrumb } from '../components/cmpBreadcrumb';
import { Link } from 'gatsby';
import {
  CmpLineDetailLink,
  CmpCompanyDetailLink,
} from '../components/cmpLinks';

const Component: React.FC<{
  pageContext: PagePropsLineDetail;
}> = ({ pageContext: { line } }) => {
  console.log(line);
  return (
    <CmpLayout>
      <CmpHead title={line.lineNameAlias} description={line.lineNameAlias} />
      <CmpBreadcrumb
        items={[
          { text: '事業者一覧', path: '/company' },
          {
            text: line.company.companyNameAlias,
            path: `/company/${line.company.companyCode}`,
          },
          { text: line.lineNameAlias, path: null },
        ]}
      />
      <h1>
        <span className="mr-2">{line.company.companyNameAlias}</span>
        <span>{line.lineNameAlias}</span>
      </h1>
      {line.lineSections.map((lineSection, i) => (
        <section key={i}>
          {lineSection.stations.map((station, i) => (
            <div className="mb-3" key={i}>
              <div className="">
                <span>{station.stationName}</span>
                <span>（{station.stationNameKana}）</span>
              </div>
              <div className="ml-2">
                {station.lines.map((l, i) => (
                  <span key={i} className="mr-1">
                    <CmpLineDetailLink
                      companyCode={line.company.companyCode}
                      lineCode={l.lineCode}
                      lineName={l.lineNameAlias}
                    />
                  </span>
                ))}
              </div>
              <div className="ml-4">
                {station.groupStations.map((s, i) => (
                  <div key={i}>
                    <div>
                      <span>{s.stationName}</span>
                      <span>（{s.stationNameKana}）</span>
                    </div>
                    <div className="ml-2">
                      <div>
                        <CmpCompanyDetailLink
                          companyCode={s.company.companyCode}
                          companyName={s.company.companyNameAlias}
                        />
                      </div>
                      {s.lines.map((l, i) => (
                        <span key={i} className="mr-1">
                          <CmpLineDetailLink
                            companyCode={s.company.companyCode}
                            lineCode={l.lineCode}
                            lineName={l.lineNameAlias}
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </CmpLayout>
  );
};

export default Component;
