import * as React from 'react';
import Layout from '../components/layout.component';
import { graphql } from 'gatsby';

type Data = {
  markdownRemark: {
    path: string;
    html: string;
    frontmatter: {
      path: string;
      title: string;
    };
  };
};

const Component: React.FC<{ data: Data }> = ({ data }) => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div>
    </Layout>
  );
};

export default Component;

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
