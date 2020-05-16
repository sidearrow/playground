import React from 'react'
import CmpLayout from '../../components/layout.cmp'
import { CompanyRepository } from '../../repositories/company.repository';
import Link from 'next/link';

type Props = (ReturnType<typeof getStaticProps> extends Promise<infer T> ? T : never)['props']

const Component: React.FC<Props> = ({ companies }) => {
  return (
    <CmpLayout title="事業者一覧">
      <h1>事業者一覧</h1>
      <section>
        {companies.map(company => (
          <span className="mr-1 d-inline-block">
            <Link href={`/company/${company.companyCode}`}>{company.companyNameAlias}</Link>
          </span>
        ))}
      </section>
    </CmpLayout>
  )
}

export default Component;

export const getStaticProps = async () => {
  const companies = await CompanyRepository.getAll();

  return { props: { companies: companies } }
}
