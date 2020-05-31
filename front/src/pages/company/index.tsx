import React from 'react';
import CmpLayout from '../../components/layout.cmp';
import Link from 'next/link';
import CmpBreadcrumb from '../../components/breadcrumb.cmp';
import { GetStaticProps } from 'next';
import { CompanyEntity } from '../../api/entities';
import { ApiClient } from '../../api/client';

type Props = {
  companies: CompanyEntity[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const companies = await new ApiClient().getCompanyAll();

  return { props: { companies: companies } };
};

const Component: React.FC<Props> = ({ companies }) => {
  return (
    <CmpLayout title="事業者一覧">
      <CmpBreadcrumb
        items={[
          { name: 'TOP', path: '/' },
          { name: '事業者一覧', path: null },
        ]}
      />
      <h1>事業者一覧</h1>
      <section>
        <div className="form-row">
          {companies.map((company, i) => (
            <div className="col-md-4 col-6" key={i}>
              <Link href={`/company/${company.companyCode}`}>
                {company.companyNameAlias}
              </Link>
              {company.corporateColor !== null && (
                <span
                  className="badge px-1 ml-1 rounded-circle"
                  style={{ backgroundColor: company.corporateColor }}
                >
                  &nbsp;&nbsp;
                </span>
              )}
              {company.status === 1 && (
                <span className="badge badge-secondary ml-1">廃止</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </CmpLayout>
  );
};

export default Component;
