import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import CmpLayout from '../../components/layout.cmp';

const Component: React.FC<{ pageData: PageData }> = ({ pageData }) => {
  const companies = pageData.companies.filter(v => [1, 2].indexOf(v.companyTypeId) !== -1);
  companies.push({ companyCode: '', companyId: 999, companyNameAlias: 'その他', companyTypeId: 0 });

  const targetCompanyIds = companies.map(v => v.companyId);
  pageData.lines = pageData.lines.map(line => {
    if (targetCompanyIds.indexOf(line.companyId) === -1) {
      line.companyId = 999;
    }
    return line;
  });

  const [lines, setLines] = useState(pageData.lines);

  const handleChangeCompanyIdList = () => {
    const companyIds = [];
    document.getElementsByName('companyId').forEach((el: HTMLInputElement) => {
      el.checked && companyIds.push(Number(el.value));
    });

    if (companyIds.length === 0) {
      setLines(pageData.lines);
      return;
    }

    const isSelectOther = companyIds.indexOf(999) !== -1;
    const _lines = pageData.lines.filter(line => companyIds.indexOf(line.companyId) !== -1);

    setLines(_lines);
  };

  return (
    <CmpLayout title="路線一覧">
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
      {lines.map((line, i) => (
        <div>
          <Link href={`/line/${line.lineCode}`}>
            <a>{line.lineNameAlias}</a>
          </Link>
        </div>
      ))}
    </CmpLayout>
  );
};

export default Component;

type PageData = {
  companies: {
    companyId: number;
    companyCode: string;
    companyNameAlias: string;
    companyTypeId: number;
  }[];
  lines: {
    lineCode: string;
    lineNameAlias: string;
    companyId: number;
  }[];
};

export async function getStaticProps() {
  const companies = (await axios.get('http://localhost:5000/company')).data;

  const lines = (await axios.get('http://localhost:5000/line')).data;

  return { props: { pageData: { companies: companies, lines: lines } } };
}
