import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import { ApiResponceType } from '../ApiResponseType';

const Component: React.FC<{
  pageContext: {
    company: ApiResponceType.CompanyDetail;
  };
}> = ({ pageContext: { company } }) => {
  return (
    <Layout title={company.companyName}>
      <span>
        <Link to="company">事業者一覧</Link>
      </span>
      <h1>{company.companyName}</h1>
      {company.lines.map(line => (
        <Link
          className="d-inline-block"
          style={{ marginRight: '0.5rem' }}
          to={`line/${line.lineCode}`}
        >
          {line.lineName}
        </Link>
      ))}
    </Layout>
  );
};

export default Component;
