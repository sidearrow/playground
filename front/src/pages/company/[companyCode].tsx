import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CompanyRepository } from '../../repositories/company.repository';
import CmpLayout from '../../components/layout.cmp';
/*import { LineChart, XAxis, Line, YAxis, Tooltip, Legend } from 'recharts';*/
import Link from 'next/link';
import CmpBreadcrumb from '../../components/breadcrumb.cmp';
import { CompanyEntity } from '../../entities/company.entity';

export const getStaticPaths: GetStaticPaths = async () => {
  const companies = await CompanyRepository.getAll();
  const paths = companies.map((copmany) => ({
    params: { companyCode: copmany.companyCode },
  }));

  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{
  company: CompanyEntity;
}> = async ({ params }) => {
  const company = await CompanyRepository.findByCompanyCode(
    params?.companyCode as string
  );

  return { props: { company: company } };
};

type Props = (ReturnType<typeof getStaticProps> extends Promise<infer T>
  ? T
  : never)['props'];

const TransportPassengersTable: React.FC<{
  data: Props['company']['companyStatistics'];
}> = ({ data }) => {
  if (data === undefined || data.length === 0) {
    return <div className="alert alert-warning">データなし</div>;
  }

  data = data.slice(-5).reverse();

  return (
    <div className="table-responsive">
      <table
        className="table table-sm table-bordered"
        style={{ fontSize: '0.85em', whiteSpace: 'nowrap' }}
      >
        <thead>
          <tr className="alert-dark">
            <th colSpan={2} style={{ textAlign: 'center' }}>
              (千人) / 年度
            </th>
            {data.map((v, i) => (
              <th key={i} style={{ textAlign: 'center' }}>
                {v.year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowSpan={3} className="alert-dark">
              定期
            </th>
            <th className="alert-dark">通勤</th>
            {data.map((v, i) => (
              <td key={i} style={{ textAlign: 'right' }}>
                {v.transportPassengersTeikiTsukin === null
                  ? '-'
                  : v.transportPassengersTeikiTsukin.toLocaleString()}
              </td>
            ))}
          </tr>
          <tr>
            <th className="alert-dark">通学</th>
            {data.map((v, i) => (
              <td key={i} style={{ textAlign: 'right' }}>
                {v.transportPassengersTeikiTsugaku === null
                  ? '-'
                  : v.transportPassengersTeikiTsugaku.toLocaleString()}
              </td>
            ))}
          </tr>
          <tr>
            <th className="alert-dark">計</th>
            {data.map((v, i) => (
              <td key={i} style={{ textAlign: 'right' }}>
                {v.transportPassengersTeikiTotal === null
                  ? '-'
                  : v.transportPassengersTeikiTotal.toLocaleString()}
              </td>
            ))}
          </tr>
          <tr>
            <th colSpan={2} className="alert-dark">
              定期外
            </th>
            {data.map((v, i) => (
              <td key={i} style={{ textAlign: 'right' }}>
                {v.transportPassengersTeikigai === null
                  ? '-'
                  : v.transportPassengersTeikigai.toLocaleString()}
              </td>
            ))}
          </tr>
          <tr>
            <th colSpan={2} className="alert-dark">
              計
            </th>
            {data.map((v, i) => (
              <td key={i} style={{ textAlign: 'right' }}>
                {v.transportPassengersTeikigai === null
                  ? '-'
                  : v.transportPassengersSum.toLocaleString()}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="text-secondary">
        <small>国土交通省 鉄道統計年報 より作成</small>
      </div>
    </div>
  );
};

const TransportRevenuePassengerTable: React.FC<{
  data: Props['company']['companyStatistics'];
}> = ({ data }) => {
  if (data === undefined || data.length === 0) {
    return <div className="alert alert-warning">データなし</div>;
  }

  data = data.slice(-5).reverse();

  return (
    <div className="table-responsive">
      <table
        className="table table-sm table-bordered"
        style={{ fontSize: '0.85em', whiteSpace: 'nowrap' }}
      >
        <thead>
          <tr className="alert-dark">
            <th colSpan={2} style={{ textAlign: 'center' }}>
              (千円) / 年度
            </th>
            {data.map((v, i) => (
              <th key={i} style={{ textAlign: 'center' }}>
                {v.year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowSpan={3} className="alert-dark">
              定期
            </th>
            <th className="alert-dark">通勤</th>
            {data.map((v, i) => (
              <td key={i} style={{ textAlign: 'right' }}>
                {v.transportRevenuePassengerTeikiTsukin.toLocaleString()}
              </td>
            ))}
          </tr>
          <tr>
            <th className="alert-dark">通学</th>
            {data.map((v, i) => (
              <td key={i} style={{ textAlign: 'right' }}>
                {v.transportRevenuePassengerTeikiTsugaku.toLocaleString()}
              </td>
            ))}
          </tr>
          <tr>
            <th className="alert-dark">計</th>
            {data.map((v, i) => (
              <td key={i} style={{ textAlign: 'right' }}>
                {v.transportRevenuePassengerTotal.toLocaleString()}
              </td>
            ))}
          </tr>
          <tr>
            <th colSpan={2} className="alert-dark">
              定期外
            </th>
            {data.map((v, i) => (
              <td key={i} style={{ textAlign: 'right' }}>
                {v.transportRevenuePassengerTeikigai.toLocaleString()}
              </td>
            ))}
          </tr>
          <tr>
            <th colSpan={2} className="alert-dark">
              計
            </th>
            {data.map((v, i) => (
              <td key={i} style={{ textAlign: 'right' }}>
                {v.transportRevenuePassengerTotal.toLocaleString()}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className="text-secondary">
        <small>国土交通省 鉄道統計年報 より作成</small>
      </div>
    </div>
  );
};

const Component: React.FC<Props> = ({ company }) => {
  return (
    <CmpLayout title={`${company.companyNameAlias}`}>
      <section>
        <CmpBreadcrumb
          items={[
            { name: 'TOP', path: '/' },
            { name: '事業者一覧', path: '/company' },
            { name: company.companyNameAlias, path: null },
          ]}
        />
      </section>
      <h1>{company.companyNameAlias}</h1>
      <section>
        <div className="form-row">
          <div className="col-md-4">
            <div className="alert-secondary font-weight-bold p-1">事業者名</div>
          </div>
          <div className="col-md-8">
            <div className="p-1">{company.companyName}</div>
          </div>
        </div>
      </section>
      <h2>路線一覧</h2>
      <section>
        <div className="form-row">
          {company?.lines?.map((line, i) => (
            <div className="col-md-3 col-4 text-nowrap" key={i}>
              <Link href={`/line/${line.lineCode}`}>{line.lineNameAlias}</Link>
            </div>
          ))}
        </div>
      </section>
      <h2>統計情報</h2>
      <h3>輸送人員</h3>
      <section>
        <TransportPassengersTable data={company.companyStatistics?.slice(-5)} />
      </section>
      <h3>旅客輸送収入</h3>
      <section>
        <TransportRevenuePassengerTable
          data={company.companyStatistics?.slice(-5)}
        />
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
