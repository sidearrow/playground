import React from 'react';
import { CmpLayout } from '../components/cmpLayout';
import { PagePropsCompany } from 'gatsbyNode/pagePropsTypes';

type Props = {
  pageContext: PagePropsCompany;
};

const Component: React.FC<Props> = ({ pageContext: { companies } }) => {
  console.log(companies);
  return (
    <CmpLayout>
      <h1>事業者一覧</h1>
      {companies.map((company, i) => (
        <div key={i}>{company.companyNameAlias}</div>
      ))}
    </CmpLayout>
  );
};

export default Component;
