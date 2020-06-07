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
        <div className="row">
          {companies.map((company, i) => (
            <div className="col-md-4 col-6" key={i}>
              <Link to={`/company/${company.companyCode}`}>
                {company.companyNameAlias}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </CmpLayout>
  );
};

export default Component;
