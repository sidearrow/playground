import React from 'react';
import { GetStaticPaths } from 'next';
import { CompanyRepository } from '../../repositories/company.repository';
import CmpLayout from '../../components/layout.cmp';
import { LineChart, XAxis, Line, YAxis, Tooltip, Legend } from 'recharts';
import Link from 'next/link';

type Props = (ReturnType<typeof getStaticProps> extends Promise<infer T> ? T : never)['props']

const TransportPassengersTable: React.FC<{ data: Props['company']['companyStatistics'] }> = ({ data }) => {
  data = data.slice(-5).reverse();

  return (
    <div className="table-responsive">
      <table className="table table-sm table-bordered" style={{ fontSize: '0.9em' }}>
        <thead>
          <tr>
            <th colSpan={2}></th>
            {data.map(v => (
              <th style={{ textAlign: 'center' }}>{v.year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={3}>定期</td>
            <td>通勤</td>
            {data.map(v => <td style={{ textAlign: 'right' }}>{v.transportPassengersTeikiTsukin.toLocaleString()}</td>)}
          </tr>
          <tr>
            <td>通学</td>
            {data.map(v => <td style={{ textAlign: 'right' }}>{v.transportPassengersTeikiTsugaku.toLocaleString()}</td>)}
          </tr>
          <tr>
            <td>計</td>
            {data.map(v => <td style={{ textAlign: 'right' }}>{v.transportPassengersTeikiTotal.toLocaleString()}</td>)}
          </tr>
          <tr>
            <td colSpan={2}>定期外</td>
            {data.map(v => <td style={{ textAlign: 'right' }}>{v.transportPassengersTeikigai.toLocaleString()}</td>)}
          </tr>
          <tr>
            <td colSpan={2}>計</td>
            {data.map(v => <td style={{ textAlign: 'right' }}>{v.transportPassengersSum.toLocaleString()}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  )
}


const Component: React.FC<Props> = ({ company }) => {
  const statisticsLatestFiveYear = company.companyStatistics.slice(-5);

  return (
    <CmpLayout title={`${company.companyNameAlias}`}>
      <Link href="/company">事業者一覧</Link>
      <h1>{company.companyNameAlias}</h1>
      <h2>輸送人員</h2>
      <section>
        <div className="alert alert-info">
          国土交通省 鉄道統計年報 より作成<br />
        </div>
      </section>
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
