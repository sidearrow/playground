import React from 'react';
import { CmpLayout } from '../components/cmpLayout';
import { PagePropsCompany } from '../gatsbyNode/pagePropsTypes';
import { Link } from 'gatsby';

type Props = {
  pageContext: PagePropsCompany;
};

const Component: React.FC<Props> = ({ pageContext: { companies } }) => {
  return (
    <CmpLayout>
      <h1>事業者一覧</h1>
      <section>
        {companies.map((company, i) => (
          <div className="card border-dark mb-2" key={i}>
            <div className="card-body p-2">
              <div className="mb-1">
                <h5 className="pr-2 d-inline-block">
                  <Link to={`/company/${company.companyCode}`}>
                    {company.companyNameAlias}
                  </Link>
                </h5>
                <span className="d-inline-block">{company.companyName}</span>
              </div>
              <div className="mb-1">
                {company.railwayRailtrackTypes.map((rrt, i) => (
                  <span
                    key={i}
                    className="border border-dark px-1 mr-1 d-inline-block mb-1"
                  >
                    {rrt.railwayRailtrackTypeName}
                  </span>
                ))}
                {company.railwayTypes.map((railwayType, i) => (
                  <span
                    key={i}
                    className="border border-dark px-1 mr-1 d-inline-block mb-1"
                  >
                    {railwayType.railwayTypeName}
                  </span>
                ))}
              </div>
              <div>
                <span className="border border-dark p-1">
                  <span className="border-right border-secondary pr-1 mr-1">
                    路線総距離
                  </span>
                  <span>{company.length} km</span>
                </span>
                <span className="border border-dark p-1 ml-2">
                  <span className="border-right border-secondary pr-1 mr-1">
                    路線数
                  </span>
                  <span>{company.lineNum}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </CmpLayout>
  );
};

export default Component;
