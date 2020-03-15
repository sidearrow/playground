import * as React from 'react';
import Layout from '../components/Layout';
import { ApiResponceType } from '../ApiResponceType';
import Table from '../components/Table';

const Component: React.FC<{
  pageContext: {
    companies: ApiResponceType.Company[];
  }
}> = ({ pageContext: { companies } }) => {
  const tableData = companies.map(company => [
    company.companyName, company.length.toFixed(1)
  ]);

  const cells = [
    (v: string | number | null) => (<td>{v}</td>),
    (v: string | number | null) => (<td className='text-right'>{v}</td>),
  ];

  return (
    <Layout title={'営業キロ'}>
      <h1>事業者別営業キロ</h1>
      <Table
        data={tableData}
        cells={cells}
        elThead={
          <>
            <th>事業者名</th>
            <th>営業キロ</th>
          </>
        }
      />
    </Layout>
  );
};

export default Component;
