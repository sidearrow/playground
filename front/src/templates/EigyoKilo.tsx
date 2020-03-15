import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import { ApiResponceType } from '../ApiResponceType';
import Table from '../components/Table';

const Component: React.FC<{
  pageContext: {
    companies: ApiResponceType.Company[];
  }
}> = ({ pageContext: { companies } }) => {
  const tableData = companies.map(company => [
    company.companyName, company.length
  ]);

  return (
    <Layout title={'営業キロ'}>
      <Table tableData={tableData} />
    </Layout>
  );
};

export default Component;
