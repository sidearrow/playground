import React, { useState } from 'react';
import Link from 'next/link';
import CmpLayout from '../../components/layout.cmp';
import { CompanyRepository } from '../../repositories/company.repository';
import { LineRepository } from '../../repositories/line.repository';
import CmpBreadcrumb from '../../components/breadcrumb.cmp';
import { GetStaticProps } from 'next';
import { CompanyEntity } from '../../entities/company.entity';
import { LineEntiry } from '../../entities/line.entity';

export const getStaticProps: GetStaticProps<{
  companies: CompanyEntity[];
  lines: LineEntiry[];
}> = async () => {
  const companies = await CompanyRepository.getAll();
  const lines = await LineRepository.getAll();

  return { props: { companies: companies, lines: lines } };
};

type Props = (ReturnType<typeof getStaticProps> extends Promise<infer T>
  ? T
  : never)['props'];

const Component: React.FC<Props> = ({ companies, lines }) => {
  companies = companies.filter((v) => [1, 2].indexOf(v.companyTypeId) !== -1);
  companies.push({
    companyCode: '',
    companyId: 999,
    companyName: 'その他',
    companyNameAlias: 'その他',
    companyTypeId: 0,
    corporateColor: null,
    status: 0,
  });

  const targetCompanyIds = companies.map((v) => v.companyId);
  lines = lines.map((line) => {
    if (targetCompanyIds.indexOf(line.companyId) === -1) {
      line.companyId = 999;
    }
    return line;
  });

  const [viewLines, setViewLines] = useState(lines);

  const handleChangeCompanyIdList = () => {
    const companyIds: number[] = [];
    (document.getElementsByName('companyId') as NodeListOf<
      HTMLInputElement
    >).forEach((el) => {
      el.checked && companyIds.push(Number(el.value));
    });

    if (companyIds.length === 0) {
      setViewLines(lines);
      return;
    }

    setViewLines(
      lines.filter((line) => companyIds.indexOf(line.companyId) !== -1)
    );
  };

  return (
    <CmpLayout title="路線一覧">
      <CmpBreadcrumb
        items={[
          { name: 'TOP', path: '/' },
          { name: '路線一覧', path: null },
        ]}
      />
      <h1>路線一覧</h1>
      <section>
        <div className="card">
          <div className="card-body">
            <div className="form-row">
              {companies.map((company, i) => (
                <div className="col-md-3 col-sm-4 col-6" key={i}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={company.companyId}
                      id={String(company.companyId)}
                      name="companyId"
                      onChange={handleChangeCompanyIdList}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={String(company.companyId)}
                    >
                      {company.companyNameAlias}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="form-row">
        {viewLines.map((line, i) => (
          <div className="col-md-4 col-12 mb-1" key={i}>
            <span className="mr-3">
              <Link href={`/line/${line.lineCode}`}>
                <a>{line.lineNameAlias}</a>
              </Link>
            </span>
            <span className="badge badge-info mr-1">
              {line.company.companyNameAlias}
            </span>
            {line.statusId === 2 && (
              <span className="badge badge-secondary mr-1">廃線</span>
            )}
          </div>
        ))}
      </div>
    </CmpLayout>
  );
};

export default Component;
