import React from 'react'
import CmpLayout from '../../components/layout.cmp'
import { CompanyRepository } from '../../repositories/company.repository';
import Link from 'next/link';
import CmpBreadcrumb from '../../components/breadcrumb.cmp';

type Props = (ReturnType<typeof getStaticProps> extends Promise<infer T> ? T : never)['props']

const Component: React.FC<Props> = ({ companies }) => {
  return (
    <CmpLayout title="事業者一覧">
      <CmpBreadcrumb items={[{ name: 'TOP', path: '/' }, { name: '事業者一覧', path: null }]} />
      <h1>事業者一覧</h1>
      <section>
        <div className="form-row">
          {companies.map(company => (
            <div className="col-md-4 col-6">
              <Link href={`/company/${company.companyCode}`}>{company.companyNameAlias}</Link>
              {company.corporateColor !== null && (<span className="badge px-1 ml-1 rounded-circle" style={{ backgroundColor: company.corporateColor }}>&nbsp;&nbsp;</span>)}
              {company.status === 1 && (<span className="badge badge-secondary ml-1">廃止</span>)}
            </div>
          ))}
        </div>
      </section>
    </CmpLayout>
  )
}

export default Component;

export const getStaticProps = async () => {
  const companies = await CompanyRepository.getAll();

  return { props: { companies: companies } }
}
