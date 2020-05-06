import React from 'react';
import axios from 'axios';
import CmpLayout from '../components/layout.cmp';

const Component: React.FC<{ pageData: PageData }> = ({ pageData }) => {
  return (
    <CmpLayout title="路線一覧">
      <h1>路線一覧</h1>
    </CmpLayout>
  );
};

export default Component;

type PageData = {
  companyCode: string;
  companyNameAlias: string;
  lines: {
    lineId: number;
    lineCode: string;
    lineName: string;
  }[];
}[];

export async function getStaticProps() {
  const res = (await axios.get('http://localhost:5000/company')).data;

  return { props: { pageData: res } };
}
