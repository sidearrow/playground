import React from 'react';
import { Link } from 'gatsby';

export const CmpCompanyLink: React.FC = () => (
  <Link to="/company">事業者一覧</Link>
);

export const CmpCompanyDetailLink: React.FC<{
  companyCode: string;
  companyName: string;
}> = ({ companyCode, companyName }) => (
  <Link to={`/company/${companyCode}`}>{companyName}</Link>
);

export const CmpLineDetailLink: React.FC<{
  companyCode: string;
  lineCode: string;
  lineName: string;
}> = ({ companyCode, lineCode, lineName }) => (
  <Link to={`/company/${companyCode}/line/${lineCode}`}>{lineName}</Link>
);
