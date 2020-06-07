import React from 'react';
import { CmpLayout } from '../components/cmpLayout';
import { PagePropsCompany } from '../gatsbyNode/pagePropsTypes';
import { Link } from 'gatsby';

type Props = {
  pageContext: PagePropsCompany;
};

const Component: React.FC<Props> = ({ pageContext: { } }) => {
  return (
    <CmpLayout>
      <h1>事業者一覧</h1>
    </CmpLayout>
  );
};

export default Component;
