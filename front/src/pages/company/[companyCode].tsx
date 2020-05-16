import React from 'react';
import { GetStaticPaths } from 'next';
import { CompanyRepository } from '../../repositories/company.repository';
import CmpLayout from '../../components/layout.cmp';
import { LineChart, XAxis, Line, YAxis, Tooltip, Legend } from 'recharts';
import Link from 'next/link';
import CmpBreadcrumb from '../../components/breadcrumb.cmp'

type Props = (ReturnType<typeof getStaticProps> extends Promise<infer T> ? T : never)['props']

const TransportPassengersTable: React.FC<{ data: Props['company']['companyStatistics'] }> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="alert alert-warning">データなし</div>
    )
  }

  data = data.slice(-5).reverse();

  return (
    <div className="table-responsive">
      <table className="table table-sm table-bordered" style={{ fontSize: '0.85em', whiteSpace: 'nowrap' }}>
        <thead>
          <tr className="alert-dark">
            <th colSpan={2} style={{ textAlign: 'center' }}>(千人) / 年度</th>
            {data.map(v => (
              <th style={{ textAlign: 'center' }}>{v.year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowSpan={3} className="alert-dark">定期</th>
            <th className="alert-dark">通勤</th>
            {data.map(v => <td style={{ textAlign: 'right' }}>{v.transportPassengersTeikiTsukin.toLocaleString()}</td>)}
          </tr>
          <tr>
            <th className="alert-dark">通学</th>
            {data.map(v => <td style={{ textAlign: 'right' }}>{v.transportPassengersTeikiTsugaku.toLocaleString()}</td>)}
          </tr>
          <tr>
            <th className="alert-dark">計</th>
            {data.map(v => <td style={{ textAlign: 'right' }}>{v.transportPassengersTeikiTotal.toLocaleString()}</td>)}
          </tr>
          <tr>
            <th colSpan={2} className="alert-dark">定期外</th>
            {data.map(v => <td style={{ textAlign: 'right' }}>{v.transportPassengersTeikigai.toLocaleString()}</td>)}
          </tr>
          <tr>
            <th colSpan={2} className="alert-dark">計</th>
            {data.map(v => <td style={{ textAlign: 'right' }}>{v.transportPassengersSum.toLocaleString()}</td>)}
          </tr>
        </tbody>
      </table>
      <div className="text-secondary"><small>国土交通省 鉄道統計年報 より作成</small></div>
    </div>
  )
}


const Component: React.FC<Props> = ({ company }) => {
  const statisticsLatestFiveYear = company.companyStatistics.slice(-5);

  return (
    <CmpLayout title={`${company.companyNameAlias}`}>
      <section>
        <CmpBreadcrumb items={[{ name: 'TOP', path: '/' }, { name: '事業者一覧', path: '/company' }, { name: company.companyNameAlias, path: null }]} />
      </section>
      <h1>{company.companyNameAlias}</h1>
      <h2>路線一覧</h2>
      <section>
        <div className="form-row">
          {
            company.lines.map(line => (
              <div className="col-md-3 col-4 text-nowrap"><Link href={`/line/${line.lineCode}`}>{line.lineName}</Link></div>
            ))
          }
        </div>
      </section>
      <h2>輸送人員</h2>
      <h3>直近 5 年の推移</h3>
      <section>
        <TransportPassengersTable data={company.companyStatistics} />
      </section>
      <section>
        {/**
        <LineChart width={500} height={300} data={company.companyStatistics}>
          <XAxis dataKey="year" />
          <YAxis type="number" domain={['dataMin - 1000', 'dataMax + 1000']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="transportPassengersTeikiTsukin" name="定期（通勤）" />
          <Line type="monotone" dataKey="transportPassengersTeikiTsugaku" name="定期（通学）" />
          <Line type="monotone" dataKey="transportPassengersTeikigai" name="定期外" />
        </LineChart>
        */}
      </section>
    </CmpLayout>
  );
};

export default Component;

export const getStaticPaths: GetStaticPaths = async () => {
  const companies = await CompanyRepository.getAll();
  const paths = companies.map(copmany => ({ params: { companyCode: copmany.companyCode } }));

  return { paths: paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const company = await CompanyRepository.findByCompanyCode(params.companyCode)

  return { props: { company: company } };
}
