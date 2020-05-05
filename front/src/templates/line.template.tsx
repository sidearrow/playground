import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout.component';
import { LinePageData } from '../gatsby-node/create-page/line.create-page';

const Component: React.FC<{ pageContext: { pageData: LinePageData } }> = ({
  pageContext: { pageData },
}) => {
  return (
    <Layout title="事業者一覧">
      <h1>路線一覧</h1>
      {pageData.map((company, i) => (
        <div key={i}>
          <h2>{company.companyName}</h2>
          {company.lines.map((line, i) => (
            <Link
              to={'/line/' + line.lineCode}
              key={i}
              className="mr-1 d-inline-block"
            >
              {line.lineName}
            </Link>
          ))}
        </div>
      ))}
    </Layout>
  );
};

export default Component;
