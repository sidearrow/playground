import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';

type Company = {
  companyCode: string;
  companyName: string;
  companyTypeName: string;
};

const Component: React.FC<{
  pageContext: {
    companies: Company[];
  }
}> = ({ pageContext: { companies } }) => {
  const companiesGroupByType: { [key: string]: Company[] } = {};
  companies.forEach(company => {
    if (!(company.companyTypeName in companiesGroupByType)) {
      companiesGroupByType[company.companyTypeName] = [];
    }
    companiesGroupByType[company.companyTypeName].push(company);
  });

  return (
    <Layout title='事業者一覧'>{Object.keys(companiesGroupByType).map(type => (
      <div>
        <h1>{type}</h1>
        <div>{companiesGroupByType[type].map(company => (
          <Link to={'company/' + company.companyCode} className="d-inline-block" style={{ marginRight: '1rem' }}>{company.companyName}</Link>
        ))}</div>
      </div>
    ))}</Layout>
  );
};

export default Component;
