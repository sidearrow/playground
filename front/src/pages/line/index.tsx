import React, { useState } from 'react';
import Link from 'next/link';
import CmpLayout from '../../components/layout.cmp';
import { CompanyRepository } from '../../repositories/company.repository';
import { LineRepository } from '../../repositories/line.repository';
import CmpBadge from '../../components/badge.cmp';
import CmpBreadcrumb from '../../components/breadcrumb.cmp';

type Props = (ReturnType<typeof getStaticProps> extends Promise<infer T> ? T : never)['props'];

const Component: React.FC<Props> = ({ companies, lines }) => {
  companies = companies.filter(v => [1, 2].indexOf(v.companyTypeId) !== -1);
  companies.push({ companyCode: '', companyId: 999, companyName: 'その他', companyNameAlias: 'その他', companyTypeId: 0, corporateColor: null });

  const targetCompanyIds = companies.map(v => v.companyId);
  lines = lines.map(line => {
    if (targetCompanyIds.indexOf(line.companyId) === -1) {
      line.companyId = 999;
    }
    return line;
  });

  const [viewLines, setViewLines] = useState(lines);

  const handleChangeCompanyIdList = () => {
    const companyIds = [];
    document.getElementsByName('companyId').forEach((el: HTMLInputElement) => {
      el.checked && companyIds.push(Number(el.value));
    });

    if (companyIds.length === 0) {
      setViewLines(lines);
      return;
    }

    setViewLines(lines.filter(line => companyIds.indexOf(line.companyId) !== -1));
  };

  return (
    <CmpLayout title="路線一覧">
      <CmpBreadcrumb items={[{ name: 'TOP', path: '/' }, { name: '路線一覧', path: null }]} />
      <h1>路線一覧</h1>
      <section>
        <div className="card">
          <div className="card-body">
            <div className="form-row">
              {companies.map((company, i) => (
                <div className="col-md-2 col-sm-4 col-6" key={i}>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={company.companyId} id={String(company.companyId)} name="companyId" onChange={handleChangeCompanyIdList} />
                    <label className="form-check-label" htmlFor={String(company.companyId)}>{company.companyNameAlias}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="form-row">
        {viewLines.map((line, i) => (
          <div className="col-md-4 col-12 mb-1">
            <span className="mr-3">
              <Link href={`/line/${line.lineCode}`}>
                <a>{line.lineNameAlias}</a>
              </Link>
            </span>
            <span className="mr-1">
              <CmpBadge color={line.company.corporateColor}>{line.company.companyNameAlias}</CmpBadge>
            </span>
            {line.statusId === 2 && (
              <span>
                <span className="badge badge-secondary font-weight-normal">廃線</span>
              </span>
            )}
          </div>
        ))}
      </div>
    </CmpLayout>
  );
};

export default Component;

export async function getStaticProps() {
  const companies = await CompanyRepository.getAll();
  const lines = await LineRepository.getAll();

  return { props: { companies: companies, lines: lines } };
}
