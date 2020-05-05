import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout.component';
import { CompanyPageData } from '../gatsby-node/create-page/company.create-page';

type Company = {
  companyCode: string;
  companyName: string;
  companyTypeName: string;
};

const Component: React.FC<{ pageContext: { pageData: CompanyPageData } }> = ({
  pageContext: { pageData },
}) => {
  return (
    <Layout title="事業者一覧">
      {pageData.map((company) => (
        <>
          <h2>{company.companyName}</h2>
          {company.lines.map((line, i) => (
            <Link to={line.lineCode} key={i}>
              {line.lineName}
            </Link>
          ))}
        </>
      ))}
    </Layout>
  );
};

export default Component;
