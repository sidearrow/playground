import React from 'react';
import Head from 'next/head';

const CmpHead: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
};

export default CmpHead;
