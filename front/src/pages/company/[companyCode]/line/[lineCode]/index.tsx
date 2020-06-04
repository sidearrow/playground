import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import CmpLayout from '../../../../../components/layout.cmp';
import Link from 'next/link';
import CmpBreadcrumb from '../../../../../components/breadcrumb.cmp';
import { ApiClient } from '../../../../../api/client';
import { ParsedUrlQuery } from 'querystring';
import { LineEntity, LineResponse } from '../../../../../api/entities';

interface Params extends ParsedUrlQuery {
  companyCode: string;
  lineCode: string;
}

type Props = {
  line: LineResponse;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const lines = await new ApiClient().getLines();

  const paths = lines.map((line) => {
    return {
      params: {
        companyCode: line.company.companyCode,
        lineCode: line.lineCode,
      },
    };
  });

  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const lineCode = params?.lineCode as string;

  const line = await new ApiClient().getLineByCode(lineCode);

  return { props: { line: line } };
};

const Component: React.FC<Props> = ({ line }) => {
  const lineSections = line.lineSections;

  return (
    <CmpLayout title={line.lineNameAlias}>
      <CmpBreadcrumb
        items={[
          { name: 'TOP', path: '/' },
          { name: '事業者一覧', path: '/company' },
          {
            name: line.company.companyNameAlias,
            path: `/company/${line.company.companyCode}`,
          },
          { name: line.lineNameAlias, path: null },
        ]}
      />
      <h1>{line.lineNameAlias}</h1>
      {lineSections.map((lineSection, i) => (
        <div className="table-responsive" key={i}>
          <table
            className="table table-sm table-bordered"
            style={{ fontSize: '0.9em' }}
          >
            <thead className="alert-dark text-center">
              <tr>
                <th className="text-nowrap">駅名</th>
                <th className="text-nowrap d-md-table-cell d-none">駅名かな</th>
                <th className="text-nowrap">接続路線</th>
                <th className="text-nowrap">接続駅</th>
              </tr>
            </thead>
            {lineSection.stations.map((station, i) => {
              return (
                <tr key={i}>
                  <td>{station.stationName}</td>
                  <td className="d-md-table-cell d-none">
                    {station.stationNameKana}
                  </td>
                  <td>
                    {station.lines.map((line, i) => (
                      <div className="text-nowrap" key={i}>
                        <Link href={`/line/${line.lineCode}`}>
                          <a>{line.lineNameAlias}</a>
                        </Link>
                      </div>
                    ))}
                  </td>
                  <td>
                    {station.groupStations.map((station) => (
                      <>
                        <div>
                          <span className="mr-2">{station.stationName}</span>
                          <span className="badge badge-secondary">
                            {station.company.companyNameAlias}
                          </span>
                        </div>
                        <div>
                          <span className="mr-2">
                            {station.lines.map((line, i) => (
                              <Link href={`/line/${line.lineCode}`} key={i}>
                                <a className="d-inline-block mr-1">
                                  {line.lineName}
                                </a>
                              </Link>
                            ))}
                          </span>
                        </div>
                      </>
                    ))}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      ))}
    </CmpLayout>
  );
};

export default Component;
