import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CompanyRepository } from '../../repositories/company.repository';

const Component: React.FC = () => {
  return <div>aa</div>
};

export default Component;

export const getStaticPaths: GetStaticPaths = async () => {
  const companies = await CompanyRepository.getAll();

  const paths = companies.map(company => { return { params: { lineCode: company.companyCode } } });

  return { paths: paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: { 'aa': 'aa' } }
}
