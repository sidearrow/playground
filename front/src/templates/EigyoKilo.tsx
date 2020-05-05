import * as React from 'react';
import Layout from '../components/layout.component';
import { ApiResponceType } from '../ApiResponseType';
import Table from '../components/DataTable/DataTable';

const Component: React.FC<{
  pageContext: {
    companies: ApiResponceType.Company[];
  };
}> = ({ pageContext: { companies } }) => {
  const tableData = companies.map((company) => [
    company.companyName,
    company.length.toFixed(1),
  ]);

  const cells = [
    (v: string | number | null) => <td>{v}</td>,
    (v: string | number | null) => <td className="text-right">{v}</td>,
  ];

  return (
    <Layout title={'営業キロ'}>
      <h1>事業者別営業キロ</h1>
      <Table
        data={tableData}
        cells={cells}
        headers={[{ text: '事業者名' }, { text: '営業キロ', isSort: true }]}
        defaultSort={{
          index: 1,
          isAsc: false,
        }}
      />
    </Layout>
  );
};

export default Component;
