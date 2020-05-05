import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout.component';
import { LinePageData } from '../gatsby-node/create-page/line.create-page';
import { Box } from '@material-ui/core';

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
            <Box display="inline-block" key={i} marginRight={1}>
              <Link to={'/line/' + line.lineCode}>{line.lineName}</Link>
            </Box>
          ))}
        </div>
      ))}
    </Layout>
  );
};

export default Component;
