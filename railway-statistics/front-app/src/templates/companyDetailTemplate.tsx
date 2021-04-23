import React from 'react';
import { CmpLayout } from '../components/cmpLayout';
import { PagePropsCompanyDetail } from '../gatsbyNode/pagePropsTypes';
import { Link } from 'gatsby';
import { CmpBreadcrumb } from '../components/cmpBreadcrumb';

type Props = {
  pageContext: PagePropsCompanyDetail;
};

const Component: React.FC<Props> = ({ pageContext: { lines, company } }) => {
  return (
    <CmpLayout>
      <CmpBreadcrumb
        items={[
          { text: '事業者一覧', path: '/company' },
          { text: company.companyNameAlias, path: null },
        ]}
      />
      <h1>{company.companyNameAlias}</h1>
      <h2>路線一覧</h2>
      <section>
        <div className="row">
          {lines.map((line, i) => (
            <div className="col-md-4 col-6" key={i}>
              <Link
                to={`/company/${company.companyCode}/line/${line.lineCode}`}
              >
                {line.lineName}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </CmpLayout>
  );
};

export default Component;
